import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import { SegmentFileListViewModel } from "@/application/viewModels/SegmentFileListViewModel";
import { Header } from "@/presentation/layout/Header";
import { SideMenu } from "@/presentation/layout/SideMenu";
import DotWaveLoader from "@/presentation/components/atoms/DotWaveLoader"
import { PageBreadcrumb } from "../components/molecules/PageBreadcrumb";

type SegmentType = "Basic" | "Standard" | "Premium" | "unknown";

export default function AnalysisSubscriptionPage() {
  const { s3Key } = useParams<{ s3Key: string }>();
  const [csvRows, setCsvRows] = useState<string[][]>([]);
  const [csvData, setCsvData] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!s3Key) return;
    const decodedS3Key = decodeURIComponent(s3Key);
    const viewModel = new SegmentFileListViewModel();
    viewModel.downloadFile(decodedS3Key)
      .then((res) => {
        const reader = new FileReader();
        reader.onload = () => {
          setCsvData(reader.result as string);
        };
        reader.readAsText(res.data);
      })
      .catch(() => setCsvData("분석 데이터 로드 실패"));
  }, [s3Key]);

  useEffect(() => {
    if (csvData && !csvData.startsWith("분석 데이터 로드 실패")) {
      const parsed = Papa.parse<string[]>(csvData, { skipEmptyLines: true });
      if (parsed && parsed.data && parsed.data.length > 0) {
        setCsvRows(parsed.data as string[][]);
      } else {
        setCsvRows([]);
      }
    } else {
      setCsvRows([]);
    }
  }, [csvData]);

  const handleDownload = async () => {
    if (!s3Key) return alert("s3Key가 없습니다.");
    setDownloading(true);
    const decodedS3Key = decodeURIComponent(s3Key);

    const viewModel = new SegmentFileListViewModel();
    try {
      const response = await viewModel.downloadFile(decodedS3Key);
      const filename = decodedS3Key;
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("파일 다운로드에 실패했습니다.");
    } finally {
      setDownloading(false);
    }
  };

  // segment별로 데이터 분류
  const segmentTables = (() => {
    if (csvRows.length < 2) return null;
    const header = csvRows[0];
    const segmentIdx = header.indexOf("segment");
    if (segmentIdx === -1) return null;

    const segments: Record<SegmentType, string[][]> = {
      Basic: [],
      Standard: [],
      Premium: [],
      unknown: [],
    };

    csvRows.slice(1).forEach(row => {
      const seg = (row[segmentIdx] || "unknown") as SegmentType;
      if (segments[seg]) segments[seg].push(row);
      else segments["unknown"].push(row);
    });

    // segment별 표 생성
    return (Object.keys(segments) as SegmentType[]).map(seg => {
      const rows = segments[seg];
      if (rows.length === 0) return null;
      return (
        <div key={seg} className="mb-8">
          <div className="font-bold text-lg mb-2">
            {seg} ({rows.length}명)
          </div>
          <table className="min-w-full border text-sm mb-2">
            <thead>
              <tr>
                {header.map((col, idx) => (
                  <th key={idx} className="border px-2 py-1 bg-gray-100">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 5).map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="border px-2 py-1">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    });
  })();

  return (
    <div className="min-h-screen w-screen bg-[#f0f0e5] text-gray-800">
      <Header />
      <main className="flex">
        {/* 사이드 메뉴 */}
        <div className="w-64 pt-4 pl-4">
          <div className="mt-4 min-h-[calc(100vh-4rem)] flex flex-col justify-between">
            <SideMenu isLoggedIn={true}/>
          </div>
        </div>
        <div className="flex flex-col p-8 flex-grow">
          <div className="mb-4">
            <PageBreadcrumb title="구독 유형 기준 세그먼트 분석 결과" />
          </div>
        <div className="flex-1 flex flex-col items-center">
          {/* 메인 콘텐츠 */}
          <div className="flex-1 flex flex-col items-center">
            {/* 상단 탭 카드 - 좌측으로 220px 이동 */}
            <div
              className="w-[700px] bg-white rounded-lg shadow flex items-center justify-between px-8 py-6 mt-10 mb-8"
            >
              <div className="flex flex-col items-center flex-1 cursor-pointer opacity-60 pb-2">
                <span className="text-3xl mb-1">📋</span>
                <span className="text-gray-400 font-semibold text-lg">요청 내역 리스트</span>
              </div>
              <div className="flex flex-col items-center flex-1 cursor-pointer border-b-4 border-[#786051] pb-2">
                <span className="text-3xl mb-1 text-[#786051]">📊</span>
                <span className="text-[#786051] font-semibold text-lg">분석 결과</span>
              </div>
            </div>
            {/* 분석 결과 카드만 (좌측 -220px 이동) */}
            <div className="bg-white rounded-lg shadow p-6" style={{ minWidth: 650 }}>
              <div className="flex justify-end mb-4">
                <button
                  className={`px-4 py-2 rounded text-white ${downloading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
                  onClick={handleDownload}
                  disabled={downloading}
                >
                  {downloading ? "다운중..." : "데이터 내보내기"}
                </button>
              </div>
              <div className="font-bold text-base mb-4">분석 결과</div>
              <div className="overflow-x-auto">
                {segmentTables ? segmentTables : (
                  <pre style={{
                    whiteSpace: "pre-wrap",
                    background: "#111",
                    color: "#fff",
                    borderRadius: "8px",
                    padding: "20px",
                    fontSize: "1rem",
                    border: "2px solid #2196f3",
                    minHeight: "300px"
                  }}>
                    {csvData || <DotWaveLoader color="black" />}
                  </pre>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}

import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PageBreadcrumb } from "@/presentation/components/molecules/PageBreadcrumb";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { StepProgress } from "@/presentation/components/molecules/StepProgress";
import { Header } from "@/presentation/layout/Header";
import { CohortHistoryPanel } from "../components/organisms/CohortHistoryPanel";

export default function AnalyticsCohortDoubleRequireListPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const firstClusterType = searchParams.get("firstClusterType") || "PCL";
  const secondClusterType = searchParams.get("secondClusterType") || "SubscriptionType";

  // 선택된 파일 키를 저장 (최대 2개)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const toggleSelection = (key: string) => {
    setSelectedKeys((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key].slice(-2) // 최대 2개까지만 유지
    );
  };

  const handleCompare = () => {
    if (selectedKeys.length !== 2) return;
    const [file1, file2] = selectedKeys;
    navigate(
      `/analytics/double/result?file1=${encodeURIComponent(file1)}&file2=${encodeURIComponent(file2)}`
    );
  };

  return (
    <div className="min-h-screen w-screen bg-[#f0f0e5] text-gray-800">
      <Header />
      <main className="flex">
        <aside className="pt-4 pl-4">
          <div className="mt-4 min-h-[calc(100vh-4rem)] flex flex-col justify-between">
            <SideMenu isLoggedIn={true}/>
          </div>
        </aside>

        <section className="flex-1 flex flex-col min-h-screen px-8">
          <div className="flex flex-col flex-grow">
            <div className="mb-4">
              <PageBreadcrumb title="코호트 간 비교 분석 조건 목록" />
            </div>

            <div className="flex justify-center mb-6">
              <div className="w-full max-w-4xl">
                <StepProgress currentStep={2} />
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">{firstClusterType} 요청 내역</h2>
                <CohortHistoryPanel
                  clusterType={firstClusterType}
                  selectedKeys={selectedKeys}
                  onSelect={toggleSelection}
                />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">{secondClusterType} 요청 내역</h2>
                <CohortHistoryPanel
                  clusterType={secondClusterType}
                  selectedKeys={selectedKeys}
                  onSelect={toggleSelection}
                />
              </div>
            </div>
          </div>

          {selectedKeys.length === 2 && (
            <div className="fixed bottom-4 right-8 z-50">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
                onClick={handleCompare}
              >
                양측 비교 보기
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

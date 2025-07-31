// AnalyticsCohortDoubleCohortResultPage.tsx
import { useSearchParams } from "react-router-dom";
import { PageBreadcrumb } from "@/presentation/components/molecules/PageBreadcrumb";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { StepProgress } from "@/presentation/components/molecules/StepProgress";
import { Header } from "@/presentation/layout/Header";
import { CustomButton } from "@/presentation/components/atoms/CustomButton";
import {
  useCohortSingleCsvResultViewModel,
  useCohortSingleInsightViewModel,
} from "@/application/viewModels/CohortViewModel";
import { SingleRemainHeatmapPanel } from "@/presentation/components/organisms/SingleRemainHeatmapPanel";
import { SingleInsightPanel } from "@/presentation/components/organisms/SingleInsightPanel";
import { SingleVisualizationPanel } from "@/presentation/components/organisms/SingleVisualizationPanel";
import { useCallback } from "react";

function parseKey(key: string | null) {
  if (!key) return null;
  const parts = key.split("/");
  if (parts.length < 4 || !parts[0] || !parts[2] || !parts[3]) return null;
  return {
    infoDbNo: Number(parts[0]),
    clusterType: parts[2],
    filename: parts[3],
  };
}

export default function AnalyticsCohortDoubleCohortResultPage() {
  const [searchParams] = useSearchParams();
  const parsed1 = parseKey(searchParams.get("file1"));
  const parsed2 = parseKey(searchParams.get("file2"));

  if (!parsed1 || !parsed2 || isNaN(parsed1.infoDbNo) || isNaN(parsed2.infoDbNo)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 text-lg">
        필수 파라미터가 누락되었습니다. 이전 단계에서 다시 시도해주세요.
      </div>
    );
  }

  const {
    heatmap: heatmap1,
    doughnutChart: doughnut1,
    lineChart: line1,
    isLoadingMain: isLoading1,
    errorMain: error1,
    groupData: groupData1,
    rawCsv: rawCsv1,
  } = useCohortSingleCsvResultViewModel(parsed1);

  const {
    insight: insight1,
    isLoadingInsight: isLoadingInsight1,
    errorInsight: errorInsight1,
  } = useCohortSingleInsightViewModel(parsed1);

  const {
    heatmap: heatmap2,
    doughnutChart: doughnut2,
    lineChart: line2,
    isLoadingMain: isLoading2,
    errorMain: error2,
    groupData: groupData2,
    rawCsv: rawCsv2,
  } = useCohortSingleCsvResultViewModel(parsed2);

  const {
    insight: insight2,
    isLoadingInsight: isLoadingInsight2,
    errorInsight: errorInsight2,
  } = useCohortSingleInsightViewModel(parsed2);

  const handleDownload1 = useCallback(() => {
    if (!rawCsv1) return alert("왼쪽 데이터가 아직 로딩되지 않았습니다.");
    const blob = new Blob([rawCsv1], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = parsed1.filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [rawCsv1, parsed1.filename]);

  const handleDownload2 = useCallback(() => {
    if (!rawCsv2) return alert("오른쪽 데이터가 아직 로딩되지 않았습니다.");
    const blob = new Blob([rawCsv2], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = parsed2.filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [rawCsv2, parsed2.filename]);

  return (
    <div className="w-screen bg-[#f0f0e5] text-gray-800">
      <Header />
      <main className="flex">
        <div className="pt-4 pl-4">
          <div className="mt-4 min-h-[calc(100vh-4rem)] flex flex-col justify-between">
            <SideMenu isLoggedIn={true}/>
          </div>
        </div>

        <section className="flex-1 flex flex-col p-8">
          <div className="mb-4">
            <PageBreadcrumb title="코호트 간 비교 분석 결과" />
          </div>

          <div className="relative mb-6 w-full">
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <StepProgress currentStep={3} />
              </div>
            </div>
            <div className="absolute right-0 top-0 inline-flex flex-col gap-2 items-stretch">
              <CustomButton
                title="왼쪽 데이터 내보내기"
                loading={false}
                onClick={handleDownload1}
                color="green"
                className="w-full"
              />
              <CustomButton
                title="오른쪽 데이터 내보내기"
                loading={false}
                onClick={handleDownload2}
                color="green"
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
            {/* 왼쪽 */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-center text-blue-700">
                {parsed1.clusterType || "왼쪽 분석"}
              </h2>

              <SingleRemainHeatmapPanel heatmap={heatmap1} isLoading={isLoading1} error={error1} />

              {Object.keys(groupData1).length === 0 && !isLoading1 && !error1 ? (
                <div className="p-6 bg-white rounded-xl shadow w-full max-w-full overflow-hidden">
                  <h2 className="text-xl font-bold mb-2">시각화 결과</h2>
                  <p className="text-sm text-gray-500">그룹 데이터를 찾을 수 없습니다.</p>
                </div>
              ) : (
                <SingleVisualizationPanel
                  doughnutChart={doughnut1}
                  lineChart={line1}
                  isLoading={isLoading1}
                  error={error1}
                  groupData={groupData1}
                />
              )}

              <SingleInsightPanel
                insight={insight1}
                isLoading={isLoadingInsight1}
                error={errorInsight1}
              />
            </div>

            {/* 오른쪽 */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-center text-red-700">
                {parsed2.clusterType || "오른쪽 분석"}
              </h2>

              <SingleRemainHeatmapPanel heatmap={heatmap2} isLoading={isLoading2} error={error2} />

              {Object.keys(groupData2).length === 0 && !isLoading2 && !error2 ? (
                <div className="p-6 bg-white rounded-xl shadow w-full max-w-full overflow-hidden">
                  <h2 className="text-xl font-bold mb-2">시각화 결과</h2>
                  <p className="text-sm text-gray-500">그룹 데이터를 찾을 수 없습니다.</p>
                </div>
              ) : (
                <SingleVisualizationPanel
                  doughnutChart={doughnut2}
                  lineChart={line2}
                  isLoading={isLoading2}
                  error={error2}
                  groupData={groupData2}
                />
              )}

              <SingleInsightPanel
                insight={insight2}
                isLoading={isLoadingInsight2}
                error={errorInsight2}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
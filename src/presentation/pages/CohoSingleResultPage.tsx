// AnalyticsCohortSingleCohortResultPage.tsx
import { useSearchParams } from "react-router-dom";
import { ChartData } from "chart.js";
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

export default function AnalyticsCohortSingleCohortResultPage() {
  const [searchParams] = useSearchParams();

  const clusterType = searchParams.get("clusterType") || "";
  const infoDbNo = searchParams.get("infoDbNo");
  const filename = searchParams.get("filename") || "";

  const parsedInfoDbNo = infoDbNo ? Number(infoDbNo) : NaN;

  if (!clusterType || !infoDbNo || !filename || isNaN(parsedInfoDbNo)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 text-lg">
        필수 쿼리 파라미터가 누락되었습니다. 이전 단계에서 다시 시도해주세요.
      </div>
    );
  }

  const {
    heatmap,
    doughnutChart,
    lineChart,
    isLoadingMain,
    errorMain,
    groupData,
    rawCsv,
  } = useCohortSingleCsvResultViewModel({
    clusterType,
    infoDbNo: parsedInfoDbNo,
    filename,
  });

  const {
    insight,
    isLoadingInsight,
    errorInsight,
  } = useCohortSingleInsightViewModel({
    clusterType,
    infoDbNo: parsedInfoDbNo,
    filename,
  });

  const handleDownload = useCallback(() => {
    if (!rawCsv) {
      alert("아직 데이터를 불러오고 있습니다.");
      return;
    }

    const blob = new Blob([rawCsv], { type: "text/csv;charset=utf-8;" });
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(blobUrl);
  }, [rawCsv, filename]);

  return (
    <div className="min-h-screen w-screen bg-[#f0f0e5] text-gray-800">
      <Header />
      <main className="flex">
        <div className="pt-4 pl-4">
          <div className="mt-4 min-h-[calc(100vh-4rem)] flex flex-col justify-between">
            <SideMenu isLoggedIn={true}/>
          </div>
        </div>

        <section className="flex-1 flex flex-col p-8">
          <div className="mb-4">
            <PageBreadcrumb title="단일 코호트 분석" />
          </div>

          <div className="relative mb-6 w-full">
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <StepProgress currentStep={3} />
              </div>
            </div>
            <div className="absolute right-0 -top-4 flex flex-col gap-2">
              <CustomButton
                title="데이터 내보내기"
                loading={false}
                onClick={handleDownload}
                color="green"
              />
            </div>
          </div>

          <div className="w-full pb-20 space-y-6">
            <SingleRemainHeatmapPanel
              heatmap={heatmap}
              isLoading={isLoadingMain}
              error={errorMain}
            />

            {Object.keys(groupData).length === 0 && !isLoadingMain && !errorMain ? (
              <div className="p-6 bg-white rounded-xl shadow w-full max-w-full overflow-hidden">
                <h2 className="text-xl font-bold mb-2">시각화 결과</h2>
                <p className="text-sm text-gray-500">그룹 데이터를 찾을 수 없습니다.</p>
              </div>
            ) : (
              <SingleVisualizationPanel
                doughnutChart={doughnutChart as ChartData<"doughnut", number[]>}
                lineChart={lineChart as ChartData<"line", number[]>}
                isLoading={isLoadingMain}
                error={errorMain}
                groupData={groupData}
              />
            )}

            <SingleInsightPanel
              insight={insight}
              isLoading={isLoadingInsight}
              error={errorInsight}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
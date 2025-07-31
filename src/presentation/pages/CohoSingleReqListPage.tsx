import { useSearchParams } from "react-router-dom";
import { PageBreadcrumb } from "@/presentation/components/molecules/PageBreadcrumb";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { StepProgress } from "@/presentation/components/molecules/StepProgress";
import { Header } from "@/presentation/layout/Header";
import { CohortHistoryPanel } from "../components/organisms/CohortHistoryPanel";

export default function AnalyticsCohortSingleUserDataPage() {
  const [searchParams] = useSearchParams();
  const clusterType = searchParams.get("clusterType") || "PCL";

  return (
    <div className="min-h-screen w-screen bg-[#f0f0e5] text-gray-800">
      <Header />
      <main className="flex">
        <div className="pt-4 pl-4">
          <div className="mt-4 min-h-[calc(100vh-4rem)] flex flex-col justify-between">
            <SideMenu isLoggedIn={true}/>
          </div>
        </div>
        <div className="flex-1 flex flex-col min-h-screen">
          <div className="flex flex-col p-8 flex-grow">
            <div className="mb-4">
              <PageBreadcrumb title="단일 코호트 분석 조건 목록" />
            </div>
            <div className="flex justify-center mb-6">
              <div className="w-full max-w-4xl">
                <StepProgress currentStep={2} />
              </div>
            </div>
            <div className="w-full">
              <CohortHistoryPanel clusterType={clusterType} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
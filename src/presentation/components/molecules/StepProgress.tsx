import { CloudUpload, List, BarChart } from "@mui/icons-material";

interface StepItem {
  label: string;
  Icon: React.ElementType;
}

interface StepProgressProps {
  currentStep: number;
}

const steps: StepItem[] = [
  { label: "분석 군집 선택", Icon: CloudUpload },
  { label: "요청 내역 리스트", Icon: List },
  { label: "분석 결과", Icon: BarChart },
];

export function StepProgress({ currentStep }: StepProgressProps) {
  return (
    <div className="w-full flex justify-center px-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-2 flex justify-between border-2 border-[#9c7866]">
        {steps.map((step, index) => {
          const isActive = currentStep >= index + 1;

          return (
            <div
              key={step.label}
              className={`flex flex-col items-center justify-center w-full py-4 ${
                isActive ? "text-[#9c7866]" : "text-gray-500"
              }`}
            >
              <step.Icon className={`mb-1 ${isActive ? "text-[#9c7866]" : "text-gray-400"}`} />
              <div className={`text-sm font-semibold ${isActive ? "text-[#9c7866]" : "text-gray-500"}`}>
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

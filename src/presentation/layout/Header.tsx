import { TopNav } from "@/presentation/components/atoms/TopNav";
import { ProjectLogo } from "@/presentation/components/atoms/ProjectLogo";
import { ProfileAvatar } from "@/presentation/components/atoms/ProfileAvatar";
import { useAlarmViewModel } from "@/application/viewModels/useAlarmViewModel";


export function Header() {

  const { alarms } = useAlarmViewModel(); // ✅ userNo 전달
  const hasUnread = alarms.some((a) => !a.isRead);

  return (
    <>
        <ProfileAvatar hasUnread={hasUnread} /> 

      <div className="w-full relative">
        <div className="absolute top-4 left-4 z-40 flex items-center">
          <ProjectLogo />
          <span
            className="text-3xl font-extrabold text-[#6c5d53] rounded-lg"
            style={{
              fontFamily:
                "Pretendard, 'Noto Sans KR', 'Apple SD Gothic Neo', 'sans-serif'",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginLeft: 0,
            }}
          >
            다구독 <br />
            다구독
          </span>
        </div>

        <div className="flex justify-center pt-6">
          <TopNav />
        </div>
      </div>
    </>
  );
}

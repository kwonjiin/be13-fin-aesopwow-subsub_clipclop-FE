import { SideMenuButton } from "@/presentation/components/atoms/SideMenuButton";
import { CustomButton } from "@/presentation/components/atoms/CustomButton";
import { useLocation } from "react-router-dom";

interface SideMenuProps {
  isLoggedIn: boolean;
}

export function SideMenu({ isLoggedIn }: SideMenuProps) {
  const location = useLocation();

  const isDashBoardActive = isLoggedIn && 
    (location.pathname === 
      "/dash-board" || location.pathname.startsWith("/dash-board/") || location.pathname === "/");

  return (
    <div className="w-60 bg-white p-4 flex flex-col justify-between shadow-md rounded-lg  mb-20 border-2 border-[#9f8473]">
      <div>
        <div className="mb-6">
          <h2 className="font-bold text-sm mb-2">Home</h2>
          <SideMenuButton label="Dash Board" to="/dash-board" isActive={isDashBoardActive} />
        </div>

        <div className="border-t border-gray-300 my-4" />

        <div className="mb-6">
          <h2 className="font-bold text-sm mb-2">Segments</h2>
          <SideMenuButton label="누적 시청시간" to="/segments/watchtime" />
          <SideMenuButton label="구독 유형" to="/segments/subscription" />
          <SideMenuButton label="선호 장르" to="/segments/genre" />
          <SideMenuButton label="마지막 접속일" to="/segments/lastlogin" />
        </div>

        <div className="border-t border-gray-300 my-4" />

        <div className="mb-6">
          <h2 className="font-bold text-sm mb-2">Cohorts</h2>
          <SideMenuButton label="단일 분석" to="/analytics/single/clusterselect" />
          <SideMenuButton label="양측 비교" to="/analytics/double/clusterselect" />
        </div>
        
        <div className="border-t border-gray-300 my-4" />

        <div className="mb-6">
          <h2 className="font-bold text-sm mb-2">Shap</h2>
          <SideMenuButton label="Shap 분석" to="/shap" />
        </div>

        <div className="border-t border-gray-300 my-4" />

        <div className="mb-6">
          <h2 className="font-bold text-sm mb-2">문의 게시판</h2>
          <SideMenuButton label="문의 게시판" to="/qna" />
        </div>
      </div>

      <div className="border-t border-gray-300 my-4" />

      <div className="mt-4 bg-[#9f8473] p-3 rounded-md border border-gray-300">
        <h3 className="text-sm font-bold mb-2">Upgrade to PRO</h3>
        <p className="text-xs mb-3">
          Upgrade to Material Tailwind PRO and get even more components, plugins, advanced features and premium.
        </p>
        <CustomButton
          title="Upgrade Now"
          loading={false}
          color="black"
          onClick={() => (window.location.href = "/membership")}
        />
      </div>
    </div>
  );
}
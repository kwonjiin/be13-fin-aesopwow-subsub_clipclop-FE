// @/presentation/components/atoms/ProfileAvatar.tsx
import { useState, useRef, useEffect } from "react";
import { /*Link,*/ useNavigate } from "react-router-dom";
import profileImage from "@/assets/pro.png";
// import axiosInstance from "@/infrastructure/api/Axios";
import { LogoutButton } from "../molecules/LogoutButton";
import { CustomButton } from "../atoms/CustomButton";

export function ProfileAvatar({ hasUnread }: { hasUnread?: boolean }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

const isLoggedIn =
  !!localStorage.getItem("token") || !!sessionStorage.getItem("token");


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50" ref={dropdownRef}>
      <div className="relative w-10 h-10">
        {/* 프로필 이미지 */}
        {isLoggedIn ? (
          <img
            src={profileImage}
            alt="User Avatar"
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-white shadow-md"
            onClick={() => setOpen((prev) => !prev)}
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full border-2 border-white shadow-md bg-gray-200 cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          />
        )}

        {/* 🔴 안 읽은 알림 표시 */}
        {hasUnread && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white" />
        )}
      </div>

      {/* 드롭다운 팝업 */}
      {open && (
        <div className="mt-2 bg-white rounded-xl shadow-lg text-sm text-gray-700 absolute right-0 w-32 py-2 px-3 space-y-1 z-50">
          
          {isLoggedIn ? (
            <>
            <CustomButton
            title="MyPage"
            onClick={() => navigate("/mypage")}
            loading={false}
            color="#9c7866"
            className="w-full min-w-[6rem]"
          />
          <LogoutButton />
          </>
          ):(
            <>
              <CustomButton
                title="Login"
                onClick={() => navigate("/login")}
                loading={false}
                color="#9c7866"
                className="w-full min-w-[6rem]"
              />
              <CustomButton
                title="Sign up"
                onClick={() => navigate("/signup")}
                loading={false}
                color="#9c7866"
                className="w-full min-w-[6rem]"
              />
            </>
          )} 
        </div>
      )}
    </div>
  );
}

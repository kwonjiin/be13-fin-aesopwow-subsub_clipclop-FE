import { ReactNode } from "react";

interface CustomButtonProps {
  title: string;
  loading: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children?: ReactNode;
  color?: "#9c7866" | "green" | "black" ; // ⬅️ 기존
  className?: string; // ⬅️ 추가
}

export function CustomButton({
  title,
  loading,
  onClick,
  type = "button",
  disabled = false,
  color = "#9c7866",
  className = "", // ⬅️ 기본값 설정
}: CustomButtonProps) {
  const baseStyle =
    "text-xs text-white px-3 py-2 rounded transition font-normal";

  const colorStyle =
    color === "#9c7866"
      ? "bg-[#9c7866] hover:bg-[#9c7866] border border-black shadow"
      : color === "green"
      ? "bg-green-600 hover:bg-green-700 border border-black shadow"
      : "bg-black hover:bg-gray-800"; // ⬅️ black 버튼 스타일

  const disabledStyle = loading || disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`${baseStyle} ${colorStyle} ${disabledStyle} ${className}`} // ⬅️ 외부 className 병합
    >
      {loading ? "처리 중..." : title}
    </button>
  );
}
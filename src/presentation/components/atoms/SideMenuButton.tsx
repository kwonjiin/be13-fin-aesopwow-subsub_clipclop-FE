// /presentation/components/atoms/SideMenuButton.tsx

import { useLocation, useNavigate } from "react-router-dom";

interface SideMenuButtonProps {
  label: string;
  to?: string;
  onClick?: () => void;
  isActive?: boolean
}

export function SideMenuButton({ label, to, onClick, isActive }: SideMenuButtonProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // const isActive = to && location.pathname === to;
  // const isActive = to && location.pathname.startsWith(to);

  const active = isActive !== undefined
    ? isActive
    : to
      ? location.pathname === to || location.pathname.startsWith(to + "/")
      : false;

  const handleClick = () => {
    if (to) navigate(to);
    onClick?.();
  };

  const baseClass =
    "w-full py-2 px-2 text-sm border border-gray-300 rounded-md font-bold text-center mb-2 transition-colors duration-150";

  const activeClass = active
    ? "bg-[#9c7866] text-white"
    : "bg-gray-100 text-black hover:border-[#9c7866] hover:bg-gray-200";

  return (
    <button onClick={handleClick} className={`${baseClass} ${activeClass}`}>
      {label}
    </button>
  );
}
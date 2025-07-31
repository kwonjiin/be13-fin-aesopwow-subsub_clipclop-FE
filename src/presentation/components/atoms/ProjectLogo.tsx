// @/presentation/components/atoms/ProjectLogo.tsx
import logo from "@/assets/logo.png"; 
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function ProjectLogo() {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    navigate("/");
  };

  return (
    <div className={`mb-2 cursor-pointer transition transform duration-200 hover:opacity-80 
      ${isClicked ? "scale-90" : "scale-100"}`} onClick={handleClick}>
      <img src={logo} alt="Project Logo" className="w-24 h-24 object-contain" />
    </div>
  );
}

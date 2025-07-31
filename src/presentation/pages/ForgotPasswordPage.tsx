import { ProjectLogo } from '../components/atoms/ProjectLogo';
import { ChangePasswordCard } from '../components/organisms/ForgotPasswordCard'; // 파일명에 맞게!
import { TopNav } from '../components/atoms/TopNav';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <div className="min-h-screen w-screen items-center bg-[#f0f0e5] text-gray-800 flex flex-col">
      <div className="absolute top-4 left-4">
        <ProjectLogo />
      </div>
      <div className="pt-6">
        <TopNav />
      </div>
      <div className="flex-grow flex items-center justify-center">
        <ChangePasswordCard form={form} setForm={setForm} />
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ForgetPasswordForm } from "../molecules/ForgetPasswordForm";
import { ForgotPasswordOtpModal } from "../molecules/ForgetPasswordOtpModel"

import { ForgetPasswordPasswordForm } from "../molecules/ForgetPasswordPasswordForm"; // 재사용

import {
  ForgotPasswordOtpApi,
  ForgotPasswordVerifyOtpApi,
  ForgotPasswordResetApi
} from "@/infrastructure/api/auth";

interface ChangePasswordForm {
  email: string;
  password: string;
  confirmPassword: string;
}

interface Props {
  form: ChangePasswordForm;
  setForm: React.Dispatch<React.SetStateAction<ChangePasswordForm>>;
}

export const ChangePasswordCard = ({ form, setForm }: Props) => {
  const [otpOpen, setOtpOpen] = useState(false);
  // const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // OTP 발송
  const handleOtpSent = async () => {
    if (!form.email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      await ForgotPasswordOtpApi(form.email);
      setOtpOpen(true);
      setMessage("OTP가 발송되었습니다. 메일함을 확인하세요.");
    } catch (e) {
      setMessage("OTP 발송에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();
  
  // OTP 인증
  const handleOtpVerify = async (otp: string) => {
    try {
      await ForgotPasswordVerifyOtpApi(form.email, otp);
      // setVerified(true);
      setOtpOpen(false);
      alert("OTP 인증이 완료되었습니다. 새 비밀번호를 입력해주세요.");
    } catch (error) {
      alert("OTP 인증에 실패했습니다.");
    }
  };

  // 비밀번호 변경
  const handleChangePassword = async () => {
    if (!form.password || form.password !== form.confirmPassword) {
      alert("비밀번호를 확인해주세요.");
      return;
    }
    setLoading(true);
    try {
      await ForgotPasswordResetApi(form.email, form.password, form.confirmPassword);
      alert("비밀번호가 성공적으로 변경되었습니다.");
      // 필요하다면 리디렉션 등 추가
      navigate("/login");
    } catch (error) {
      alert("비밀번호 변경에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fffff9] rounded-lg p-7 h-[550px] w-80 text-center text-black shadow-md space-y-4">
      <ForgetPasswordForm
        form={form}
        setForm={setForm}
        onOtpRequest={handleOtpSent}
        loading={loading}
        message={message}
      />
      <ForgotPasswordOtpModal
        open={otpOpen}
        setOpen={setOtpOpen}
        email={form.email}
        onVerify={handleOtpVerify}
      />
      <ForgetPasswordPasswordForm
        form={form}
        setForm={setForm}
        onSubmit={handleChangePassword}
        loading={loading}
    />

    </div>
  );
};

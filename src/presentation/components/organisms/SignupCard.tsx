import { SignUpUserInfoForm } from "../molecules/SignupUserInfoForm";
import { SignUpPasswordForm } from "../molecules/SignupPasswordForm";
import { useState } from "react";
import { OtpModal } from "../molecules/OtpModal";
import { SignupApi, VerifyOtpApi } from "@/infrastructure/api/auth";
import { CheckEmailResponse } from "@/core/model/CheckEmail";

interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
  phone: string;
}

interface Props {
  form: SignupForm;
  setForm: React.Dispatch<React.SetStateAction<SignupForm>>;
}

export const SignupCard = ({ form, setForm }: Props) => {
  const [otpOpen, setOtpOpen] = useState(false);
  const [email, setEmail] = useState(form.email);
  const [verifiedPassword, setVerifiedPassword] = useState("");

  const [emailCheckResult, setEmailCheckResult] = useState<CheckEmailResponse | null>(null);

  const handleOtpSent = (password: string) => {

    if (!emailCheckResult || !emailCheckResult.available || emailCheckResult.email !== form.email) {
      alert("이메일 중복 확인을 해주세요.");
      return;
    }

    // console.log("OTP 발송 후 모달 열림");
    setEmail(form.email); 
    setVerifiedPassword(password);
    setOtpOpen(true);
  };

  const handleOtpVerify = async (otp: string) => {
    try {
      // console.log("OTP 검증 시작", email, otp);

      await VerifyOtpApi(email, otp);
      // console.log("OTP 검증 성공:", verifyResponse);

      await SignupApi(email, verifiedPassword, form.confirmPassword, form.name, form.phone);
      // console.log("회원가입 성공:", signupResponse);
      alert("회원가입 되셨습니다.")

      setOtpOpen(false);

    } catch (error) {
      // console.error("OTP 확인 또는 회원가입 실패:", error);
    }
  };

  return (
    <div className="bg-[#fffff9] rounded-lg p-7 min-h-[530px] w-80 text-center text-black shadow-md space-y-4">
      <SignUpUserInfoForm 
        form={form} 
        setForm={setForm} 
        emailCheckResult={emailCheckResult}
        setEmailCheckResult={setEmailCheckResult}
      />
      <SignUpPasswordForm 
        form={form} 
        setForm={setForm} 
        onOtpSent={handleOtpSent} 
        emailCheckResult={emailCheckResult}
        />

      <OtpModal
        open={otpOpen}
        setOpen={setOtpOpen}
        email={email}
        password={verifiedPassword}
        confirmPassword={form.confirmPassword}
        name={form.name} // ✅ 필수
        phone={form.phone}
        onVerify={handleOtpVerify}
      />
    </div>
  );
};



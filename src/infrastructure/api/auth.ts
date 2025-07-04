import axiosInstance from "@/infrastructure/api/Axios"; // axiosInstance 경로 확인
import type { LoginResponse } from "@/core/model/LoginResponse";
import type { CheckEmailRequest, CheckEmailResponse } from "@/core/model/CheckEmail"; 
import type { SignupRequestOtp } from "@/core/model/SignupRequestOtp";
import type { OtpVerificationRequest } from "@/core/model/OtpVerification";

export const loginApi = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  
  const response = await axiosInstance.post(`/auth/login`, { email, password });
  return response.data;
};

export const LogoutApi = async (): Promise<void> => {
  const accessToken = 
  localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!accessToken) {
    return;
  }

  // console.log("[LOG] 로그아웃 요청 보냄", accessToken);

  await axiosInstance.post("/auth/logout", null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const EmailCheckApi = async (
  payload: CheckEmailRequest
): Promise<CheckEmailResponse> => {
  try {
    const response = await axiosInstance.post<CheckEmailResponse>(`/auth/email-check`, payload);
    const result = response.data;

    if (typeof result === "string") {
      return { email: payload.email, available: true }; 
    }

    return result; 
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      return { email: payload.email, available: false };
    } else {
      throw new Error("이메일 확인 중 예기치 못한 오류가 발생했습니다.");
    }
  }
};

export const SignupOtpApi = async (
  email: string,
  password: string,
  name: string,
): Promise<SignupRequestOtp> => {
  const requestData = { email, password, name }

  return await axiosInstance.post(`/auth/signup/otp`, requestData); // 경로 수정
};

export const VerifyOtpApi = async (
  email: string,
  otp: string
): Promise<string> => {
  const payload: OtpVerificationRequest = { email, otp };
  const response = await axiosInstance.post("/auth/signup/verify-otp", payload);
  return response.data;
};

export const ResendOtpApi = async (
  email: string
): Promise<string> => {
  const response = await axiosInstance.post("/auth/signup/resend-otp", { email });
  return response.data;
};

export const SignupApi = async (
  email: string,
  password: string,
  confirmPassword: string,
  name: string,
  phone: string
): Promise<string> => {
  const payload = { email, password, confirmPassword, name, phone };
  const response = await axiosInstance.post("/auth/signup", payload);
  return response.data;
};

// ... 기존 코드 위에 추가

export const ForgotPasswordOtpApi = async (
  email: string
): Promise<string> => {
  const response = await axiosInstance.post("/auth/forgot-password", { email });
  return response.data;
};

export const ForgotPasswordVerifyOtpApi = async (
  email: string,
  otp: string
): Promise<string> => {
  const response = await axiosInstance.post("/auth/forgot-password/verify-otp", { email, otp });
  return response.data;
};

export const ForgotPasswordResetApi = async (
  email: string,
  password: string,
  confirmPassword: string
): Promise<string> => {
  const payload = { email, password, confirmPassword };
  const response = await axiosInstance.put("/auth/forgot-password/reset", payload);
  return response.data;
};


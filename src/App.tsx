// src/App.tsx
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuthStore } from "@/application/stores/AuthStore";
import { useUserStore } from "@/application/stores/UserStore";
import ProtectedRoute from "./presentation/components/organisms/LoginProtectedRoute";

// 페이지 컴포넌트 import
import LoginPage from "./presentation/pages/LoginPage";
import SignupPage from "./presentation/pages/SignUpPage";
import DashBoardPage from "./presentation/pages/DashBoardPage";
import MyPage from "./presentation/pages/MyPage";
import MembershipPage from "./presentation/pages/MembershipPage";
import AboutUsPage from "./presentation/pages/AboutUsPage";

import CohoSingleSelectePage from "./presentation/pages/CohoSingleSelectePage";
import CohoSingleReqListPage from "./presentation/pages/CohoSingleReqListPage";
import CohoSingleResultPage from "./presentation/pages/CohoSingleResultPage";
import CohoDoubleSelectPage from "./presentation/pages/CohoDoubleSelectPage";
import CohoDoubleRequireListPage from "./presentation/pages/CohoDoubleRequireListPage";
import CohoDoubleResultPage from "./presentation/pages/CohoDoubleResultPage";

import QnaListPage from "./presentation/pages/QnaListPage";
import QnaWritePage from "./presentation/pages/QnaWritePage";
import QnaDetailPage from "./presentation/pages/QnaDetailPage";
import QnaEditPage from "./presentation/pages/QnaEditPage";

import ForgotPasswordPage from "./presentation/pages/ForgotPasswordPage";
import WatchTimePage from "@/presentation/pages/WatchTimePage";
import SubscriptionPage from "@/presentation/pages/SubscriptionPage";
import GenrePage from "@/presentation/pages/GenrePage";
import LastLoginPage from "@/presentation/pages/LastLoginPage";

// import AnalyticsShapPage from "./presentation/pages/AnalyticsShapPage";
// import AnalyticsShapFilterPage from "./presentation/pages/AnalyticsShapFilterPage";
import SegSubscriptionPage from "./presentation/pages/SegSubscriptionPage";
import SegWatchTimePage from "./presentation/pages/SegWatchTimePage";
import SegGenrePage from "./presentation/pages/SegGenrePage";
import SegLastLoginPage from "./presentation/pages/SegLastLoginPage";

import ErrorPage from "./presentation/pages/ErrorPage";

function App() {
  const initializeToken = useAuthStore((state) => state.initializeToken);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const store = useUserStore.getState();
      if (parsedUser.userNo) {
        store.setUserNo(parsedUser.userNo);
        store.setCompanyNo(parsedUser.companyNo);
        store.setInfoDbNo(parsedUser.infoDbNo);
        store.setOriginTable(parsedUser.originTable);
        store.setRole(parsedUser.role);
        store.setRoleNo(parsedUser.roleNo);
        store.setName(parsedUser.name || "");
        store.setPhone(parsedUser.phone || "");
        store.setEmail(parsedUser.email || "");
      }
    }
  }, []);

  useEffect(() => {
    initializeToken();
  }, [initializeToken]);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }
    return (
        <>
            <ToastContainer />
            <Routes>
                {/* 인증/비인증 라우트 구분 */}
                <Route path="/" element={isLoggedIn ? <DashBoardPage /> : <AboutUsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot/password" element={<ForgotPasswordPage />} />
        
                <Route path="/dash-board" element={
                    // <ProtectedRoute>
                        <DashBoardPage />
                    // </ProtectedRoute>
                } />
            <Route path="/mypage" element={<MyPage />} />
        

        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />

        <Route
          path="/analytics/single/clusterselect"
          element={
            // <ProtectedRoute>
              <CohoSingleSelectePage />
            // </ProtectedRoute>
          }
        />
        <Route path="/analytics/single/requirelist" element={<CohoSingleReqListPage />} />
        <Route
          path="/analytics/single/result"
          element={
            // <ProtectedRoute>
              <CohoSingleResultPage />
            // </ProtectedRoute>
          }
        />

        <Route
          path="/analytics/double/clusterselect"
          element={
            // <ProtectedRoute>
              <CohoDoubleSelectPage />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/analytics/double/requirelist"
          element={
            // <ProtectedRoute>
              <CohoDoubleRequireListPage />
            // </ProtectedRoute>
          }
        />
        <Route path="/analytics/double/result" element={<CohoDoubleResultPage />} />

        <Route path="/qna" element={<QnaListPage />} />
        <Route path="/qna/write" element={<QnaWritePage />} />
        <Route path="/qna/:id" element={<QnaDetailPage />} />
        <Route path="/qna/edit/:id" element={<QnaEditPage />} />

        <Route path="/segments/watchtime" element={<WatchTimePage />} />
        <Route path="/segments/subscription" element={<SubscriptionPage />} />
        <Route path="/segments/genre" element={<GenrePage />} />
        <Route path="/segments/lastlogin" element={<LastLoginPage />} />

        <Route path="/shap" element={<ErrorPage />} />
        <Route path="/howto" element={<ErrorPage />} />
        <Route path="/segments/subscription/:s3Key" element={<SegSubscriptionPage />} />
        <Route path="/segments/watchtime/:s3Key" element={<SegWatchTimePage />} />
        <Route path="/segments/genre/:s3Key" element={<SegGenrePage />} />
        <Route path="/segments/lastlogin/:s3Key" element={<SegLastLoginPage  />} />
      </Routes>
    </>
  );
}

export default App;

// src/App.tsx
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuthStore } from "@/application/stores/AuthStore";
import { useUserStore } from "@/application/stores/UserStore"; // ✅ 추가
import ProtectedRoute from "./presentation/components/organisms/LoginProtectedRoute";

// 페이지 컴포넌트 import
import LoginPage from "./presentation/pages/LoginPage";
import SignupPage from "./presentation/pages/SignUpPage";
import DashBoardPage from "./presentation/pages/DashBoardPage";
import MyPage from "./presentation/pages/MyPage";
import MembershipPage from "./presentation/pages/MembershipPage";
import AboutUsPage from "./presentation/pages/AboutUsPage";

import AnalyticsCohortSingleClusterSelectPage from "./presentation/pages/AnalyticsCohortSingleClusterSelectPage";
import AnalyticsCohortSingleRequireListPage from "./presentation/pages/AnalyticsCohortSingleRequireListPage";
// import AnalyticsCohortSingleCohortResultPage from "./presentation/pages/AnalyticsCohortSingleCohortResultPage";
import AnalyticsCohortDoubleClusterSelectPage from "./presentation/pages/AnalyticsCohortDoubleClusterSelectPage";
// import AnalyticsCohortDoubleCohortResultPage from "./presentation/pages/AnalyticsCohortDoubleCohortResultPage";

import QnaListPage from "./presentation/pages/QnaListPage";
import QnaWritePage from "./presentation/pages/QnaWritePage";
import QnaDetailPage from "./presentation/pages/QnaDetailPage";
import QnaEditPage from "./presentation/pages/QnaEditPage";

import ForgotPasswordPage from "./presentation/pages/ForgotPasswordPage";
import WatchTimePage from "@/presentation/pages/WatchTimePage";
import SubscriptionPage from "@/presentation/pages/SubscriptionPage";
import GenrePage from "@/presentation/pages/GenrePage";
import LastLoginPage from "@/presentation/pages/LastLoginPage";

import AnalyticsShapPage from "./presentation/pages/AnalyticsShapPage";
import AnalyticsShapFilterPage from "./presentation/pages/AnalyticsShapFilterPage";

function App() {
  const initializeToken = useAuthStore((state) => state.initializeToken);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // 사용자 정보를 localStorage에서 UserStore로 복구
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
                    <ProtectedRoute>
                        <DashBoardPage />
                    </ProtectedRoute>
                } />
            <Route path="/mypage" element={<MyPage />} />
        

        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />

        <Route
          path="/analytics/single/clusterselect"
          element={
            <ProtectedRoute>
              <AnalyticsCohortSingleClusterSelectPage />
            </ProtectedRoute>
          }
        />
        <Route path="/analytics/single/requirelist" element={<AnalyticsCohortSingleRequireListPage/>} />
        {/* <Route path="/analytics/single/cohortresult" element={<AnalyticsCohortSingleCohortResultPage />} /> */}

        <Route
          path="/analytics/double/clusterselect"
          element={
            <ProtectedRoute>
              <AnalyticsCohortDoubleClusterSelectPage />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/analytics/double/cohortresult" element={<AnalyticsCohortDoubleCohortResultPage />} /> */}

        <Route path="/qna" element={<QnaListPage />} />
        <Route path="/qna/write" element={<QnaWritePage />} />
        <Route path="/qna/:id" element={<QnaDetailPage />} />
        <Route path="/qna/edit/:id" element={<QnaEditPage />} />

        <Route path="/segments/watchtime" element={<WatchTimePage />} />
        <Route path="/segments/subscription" element={<SubscriptionPage />} />
        <Route path="/segments/genre" element={<GenrePage />} />
        <Route path="/segments/lastlogin" element={<LastLoginPage />} />

        <Route path="/analytics/shap/full" element={<AnalyticsShapPage />} />
        <Route path="/analytics/shap/filter" element={<AnalyticsShapFilterPage />} />
      </Routes>
    </>
  );
}

export default App;

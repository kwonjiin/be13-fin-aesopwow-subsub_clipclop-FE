// 📁 src/pages/QnaDetailPage.tsx
import { PageBreadcrumb } from "@/presentation/components/molecules/PageBreadcrumb";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { Header } from "@/presentation/layout/Header";
import QnaDetail from "@/presentation/components/organisms/QnaDetail";

export default function QnaDetailPage() {
  return (
    <div className="min-h-screen w-screen bg-primary text-gray-800">
      <Header />
      <main className="flex">
        <div className="pt-4 pl-4">
          <div className="mt-4 min-h-[calc(100vh-4rem)] flex flex-col justify-between">
            <SideMenu />
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-screen">
          <div className="flex flex-col p-8 flex-grow">
            <div className="mb-4">
              <PageBreadcrumb title="문의사항 상세" />
            </div>

            <div className="w-full mb-6">
              <QnaDetail />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

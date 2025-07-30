import { TopNav } from "@/presentation/components/atoms/TopNav.tsx";
import { LoginCard } from "../components/organisms/LoginCard";
import { ProjectLogo } from "@/presentation/components/atoms/ProjectLogo.tsx";

const LoginPage = () => {
	return (
		<div className="min-h-screen w-screen bg-[#f0f0e5] text-gray-800 flex flex-col">
			<div className="absolute top-4 left-4">
				<ProjectLogo />
			</div>
			<div className="pt-6">
				<TopNav />
			</div>
			<div className="flex-grow flex items-center justify-center">
				<LoginCard />
			</div>
		</div>
	);
};

export default LoginPage;
import SideBar from "@/components/sidebar/SideBar";
import { ToastContainer } from "react-toastify";

export default function SiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="relative flex flex-col md:flex-row h-screen w-full overflow-hidden">
			<SideBar />
			<main className="flex-1 overflow-auto px-4 py-4 md:px-[40px] md:py-[64px] bg-[#FBFBFB]">
				{children}
			</main>
			<ToastContainer />
		</div>
	);
}

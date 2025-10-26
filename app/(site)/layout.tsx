import SideBar from "@/components/sidebar/SideBar";

export default function SiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="relative flex h-screen w-full overflow-hidden">
			<SideBar />
			<main className="flex-1 overflow-auto px-[40px] py-[64px]">
				{children}
			</main>
		</div>
	);
}

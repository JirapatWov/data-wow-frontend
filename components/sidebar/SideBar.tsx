"use client";

import { Mode, useBaseStore } from "@/stores/base";
import Link from "next/link";

const SizeBar = () => {
	const { mode, switchMode } = useBaseStore();
	return (
		<div className="flex w-[240] h-screen flex-col justify-between text-2xl border-r border-[#E7E7E7] py-10 px-2">
			<div className="flex flex-col gap-4">
				<h1 className="text-[40px] mb-6">
					{mode === Mode.ADMIN ? "Admin" : "User"}
				</h1>
				{mode === Mode.ADMIN && (
					<>
						<Link
							href="/blog"
							className="flex gap-[10px] px-2 py-4 rounded-lg hover:bg-[#EAF5F9] hover:cursor-pointer"
						>
							<img src="sidebar/home.svg" width={24} height={24} alt="home" />
							Home
						</Link>
						<Link
							href="/blog"
							className="flex gap-[10px] px-2 py-4 rounded-lg hover:bg-[#EAF5F9] hover:cursor-pointer"
						>
							<img
								src="sidebar/history.svg"
								width={24}
								height={24}
								alt="history"
							/>
							History
						</Link>
					</>
				)}
				<button
					className="flex gap-[10px] px-2 py-4 rounded-lg hover:bg-[#EAF5F9] hover:cursor-pointer"
					onClick={switchMode}
				>
					<img src="sidebar/switch.svg" width={24} height={24} alt="switch" />
					Switch to {mode === Mode.ADMIN ? "Admin" : "User"}
				</button>
			</div>
			<div className="flex gap-[10px] px-2 py-4 rounded-lg hover:bg-[#EAF5F9] hover:cursor-pointer">
				<img src="sidebar/log-out.svg" width={24} height={24} alt="logout" />
				Logout
			</div>
		</div>
	);
};

export default SizeBar;

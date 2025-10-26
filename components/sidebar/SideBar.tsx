"use client";

import { useState } from "react";
import { Menu, Mode, useBaseStore } from "@/stores/base";

const SizeBar = () => {
	const { mode, switchMode, setMenu } = useBaseStore();
	const [open, setOpen] = useState(false);

	const NavButtons = () => (
		<>
			{mode === Mode.ADMIN ? (
				<>
					<button
						className="flex items-center gap-[10px] px-2 py-4 rounded-lg hover:bg-[#EAF5F9]"
						onClick={() => {
							setMenu(Menu.HOME);
							setOpen(false);
						}}
					>
						<img src="sidebar/home.svg" width={24} height={24} alt="home" />
						<span>Home</span>
					</button>
					<button
						className="flex items-center gap-[10px] px-2 py-4 rounded-lg hover:bg-[#EAF5F9]"
						onClick={() => {
							setMenu(Menu.HISTORY);
							setOpen(false);
						}}
					>
						<img
							src="sidebar/history.svg"
							width={24}
							height={24}
							alt="history"
						/>
						<span>History</span>
					</button>
				</>
			) : (
				<>
					<button
						className="flex items-center gap-[10px] px-2 py-4 rounded-lg hover:bg-[#EAF5F9]"
						onClick={() => {
							setMenu(Menu.HOME);
							setOpen(false);
						}}
					>
						<img src="sidebar/home.svg" width={24} height={24} alt="home" />
						<span>All Concerts</span>
					</button>
					<button
						className="flex items-center gap-[10px] px-2 py-4 rounded-lg hover:bg-[#EAF5F9]"
						onClick={() => {
							setMenu(Menu.MYCONCERT);
							setOpen(false);
						}}
					>
						<img
							src="sidebar/history.svg"
							width={24}
							height={24}
							alt="history"
						/>
						<span>My Concert</span>
					</button>
				</>
			)}

			<button
				className="flex items-center gap-[10px] px-2 py-4 rounded-lg hover:bg-[#EAF5F9]"
				onClick={() => {
					switchMode();
					setOpen(false);
				}}
			>
				<img src="sidebar/switch.svg" width={24} height={24} alt="switch" />
				<span>Switch to {mode === Mode.ADMIN ? "User" : "Admin"}</span>
			</button>
		</>
	);

	return (
		<>
			{/* Mobile top bar */}
			<div className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-4 border-b border-[#E7E7E7] bg-white">
				<button
					aria-label="Open menu"
					onClick={() => setOpen(true)}
					className="p-2"
				>
					<div className="w-5 h-[2px] bg-black mb-1" />
					<div className="w-5 h-[2px] bg-black mb-1" />
					<div className="w-5 h-[2px] bg-black" />
				</button>
				<h1 className="text-[40px] font-semibold">
					{mode === Mode.ADMIN ? "Admin" : "User"}
				</h1>
				<div className="w-9" />
			</div>

			{/* Desktop sidebar */}
			<aside className="hidden md:flex w-[240px] h-screen flex-col justify-between text-2xl border-r border-[#E7E7E7] py-10 px-2">
				<div className="flex flex-col gap-4">
					<h1 className="text-[40px] mb-6">
						{mode === Mode.ADMIN ? "Admin" : "User"}
					</h1>
					<NavButtons />
				</div>
				<button className="flex items-center gap-[10px] px-2 py-4 rounded-lg hover:bg-[#EAF5F9]">
					<img src="sidebar/log-out.svg" width={24} height={24} alt="logout" />
					Logout
				</button>
			</aside>

			{/* Mobile drawer */}
			<div
				className={`md:hidden fixed inset-0 z-50 ${
					open ? "" : "pointer-events-none"
				}`}
				aria-hidden={!open}
			>
				<div
					className={`absolute inset-0 bg-black/30 transition-opacity ${
						open ? "opacity-100" : "opacity-0"
					}`}
					onClick={() => setOpen(false)}
				/>
				<aside
					className={`absolute left-0 top-0 h-full w-[80vw] max-w-[280px] bg-white border-r border-[#E7E7E7] transform transition-transform duration-300 ${
						open ? "translate-x-0" : "-translate-x-full"
					}`}
					role="dialog"
					aria-modal="true"
				>
					<div className="flex items-center justify-between px-4 py-4">
						<h2 className="text-2xl font-semibold">
							{mode === Mode.ADMIN ? "Admin" : "User"}
						</h2>
						<button
							aria-label="Close menu"
							className="p-2 rounded-lg"
							onClick={() => setOpen(false)}
						>
							✕
						</button>
					</div>

					<div className="flex h-[calc(100%-64px-60px)] flex-col gap-2 overflow-y-auto px-2 py-4">
						<NavButtons />
					</div>

					<div className="absolute bottom-0 left-0 right-0 px-2 py-4">
						<button className="flex items-center gap-[10px] px-2 py-3 rounded-lg hover:bg-[#EAF5F9] w-full">
							<img
								src="sidebar/log-out.svg"
								width={24}
								height={24}
								alt="logout"
							/>
							<span>Logout</span>
						</button>
					</div>
				</aside>
			</div>
		</>
	);
};

export default SizeBar;

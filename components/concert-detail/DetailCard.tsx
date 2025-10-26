"use client";

import { Mode, useBaseStore } from "@/stores/base";

const DetailCard = ({
	title,
	detail,
	seats,
	status,
}: {
	title: string;
	detail: string;
	seats: string;
	status: string;
}) => {
	const { mode } = useBaseStore();
	return (
		<div className="flex flex-col gap-6 border border-[#C2C2C2] rounded bg-white p-10">
			<h1 className="text-[#1692EC] text-[40px] font-semibold">{title}</h1>
			<hr className="border-[#C2C2C2]" />
			<div className="text-2xl">{detail}</div>
			<div className="flex justify-between">
				<div className="flex gap-2 items-center text-2xl">
					<img src="icon/user-black.svg" width={32} height={32} alt="user" />
					{seats ?? 0}
				</div>
				<button
					className="py-4 px-[28.5px] rounded gap-2 flex text-white text-2xl cursor-pointer"
					style={{
						backgroundColor: mode === Mode.ADMIN ? "#E84E4E" : "#E84E4E",
					}}
				>
					<img src="icon/trash.svg" width={24} height={24} alt="trash" />
					Delete
				</button>
			</div>
		</div>
	);
};

export default DetailCard;

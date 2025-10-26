"use client";

import { Mode, useBaseStore } from "@/stores/base";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const API_BASE =
	process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";

const DetailCard = ({
	id,
	title,
	detail,
	seats,
	status,
}: {
	id: number;
	title: string;
	detail: string;
	seats: string;
	status: boolean;
}) => {
	const { mode, setIsRefetch } = useBaseStore();
	const [isDelete, setIsDelete] = useState(false);

	const handleClick = async () => {
		if (mode === Mode.ADMIN) {
			setIsDelete(true);
		} else if (status) {
			try {
				const res = await axios.post(
					`${API_BASE}/user/cancel`,
					{ concertId: id },
					{
						headers: { "Content-Type": "application/json" },
					}
				);

				toast.success("Cancel successfully", {
					position: "top-right",
				});
				setIsRefetch(true);
			} catch (err: any) {
				toast.error(err.messaage, {
					position: "top-right",
				});
			}
		} else {
			try {
				const res = await axios.post(
					`${API_BASE}/user/reserve`,
					{ concertId: id },
					{
						headers: { "Content-Type": "application/json" },
					}
				);

				toast.success("Reserve successfully", {
					position: "top-right",
				});
				setIsRefetch(true);
			} catch (err: any) {
				toast.error(err.messaage, {
					position: "top-right",
				});
			}
		}
	};

	const handleDelete = async () => {
		if (!id) return;
		try {
			const res = await axios.delete(`${API_BASE}/admin/${id}`);

			toast.success("Delete successfully", {
				position: "top-right",
			});
			setIsRefetch(true);
		} catch (err: any) {
			toast.error(err.messaage, {
				position: "top-right",
			});
		}
	};
	return (
		<>
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
							backgroundColor:
								mode === Mode.ADMIN
									? "#E84E4E"
									: status
									? "#F96464"
									: "#1692EC",
						}}
						onClick={handleClick}
					>
						{mode === Mode.ADMIN && (
							<img src="icon/trash.svg" width={24} height={24} alt="trash" />
						)}
						{mode === Mode.ADMIN ? "Delete" : status ? "Cancel" : "Reserve"}
					</button>
				</div>
			</div>
			{isDelete && (
				<div className="absolute w-screen h-screen bg-black/40 top-0 left-0 flex items-center justify-center">
					<div className="flex flex-col bg-white p-6 rounded w-[422px] items-center gap-6">
						<img
							src="icon/cancel-circle.svg"
							width={48}
							height={48}
							alt="delete"
						/>
						<div className="text-xl font-bold text-center">
							Are you sure to delete?
							<br />"{title}"
						</div>
						<div className="flex gap-4 w-full">
							<button
								className="w-full py-4 rounded flex text-black text-base cursor-pointer border border-[#C4C4C4] items-center justify-center"
								onClick={() => setIsDelete(false)}
							>
								Cancel
							</button>
							<button
								className="w-full py-4 rounded flex text-white text-base cursor-pointer bg-[#E63946] items-center justify-center"
								onClick={handleDelete}
							>
								Yes, Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default DetailCard;

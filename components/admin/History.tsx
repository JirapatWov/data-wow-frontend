"use client";

import { useEffect, useState } from "react";
import DetailCard from "../concert-detail/DetailCard";
import axios from "axios";
import { useBaseStore } from "@/stores/base";
import { formatDate } from "@/utils/format";

type HistoryResponseDto = {
	id: number;
	concertName: string;
	action: string;
	username: string;
	createdAt: string;
};

const API_BASE =
	process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";
const LIST_ENDPOINT = `${API_BASE}/admin/history`;

const History = () => {
	const [rows, setRows] = useState<HistoryResponseDto[]>([]);
	const [loading, setLoading] = useState(true);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setErrorMsg(null);
				const res = await axios.get<HistoryResponseDto[]>(LIST_ENDPOINT, {
					headers: { "Content-Type": "application/json" },
				});
				setRows(Array.isArray(res.data) ? res.data : []);
			} catch (err: any) {
				const apiMessage =
					err?.response?.data?.message ||
					err?.response?.data?.error ||
					err?.message ||
					"Failed to load history.";
				setErrorMsg(String(apiMessage));
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	return (
		<div className="flex flex-col gap-12">
			{loading && (
				<div className="text-base text-[#5C5C5C]">Loading history</div>
			)}
			{errorMsg && <div className="text-red-600 text-base">{errorMsg}</div>}
			{!loading && !errorMsg && rows.length === 0 && (
				<div className="text-base text-[#5C5C5C]">No history found.</div>
			)}
			<table className="w-full border border-gray-300 text-left">
				<thead className="bg-gray-50">
					<tr>
						<th className="border px-4 py-3">Date time</th>
						<th className="border px-4 py-3">Username</th>
						<th className="border px-4 py-3">Concert name</th>
						<th className="border px-4 py-3">Action</th>
					</tr>
				</thead>
				<tbody>
					{!loading &&
						!errorMsg &&
						rows.map((data) => {
							return (
								<tr key={data.id}>
									<td className="border px-4 py-3">
										{formatDate(data.createdAt)}
									</td>
									<td className="border px-4 py-3">{data.username}</td>
									<td className="border px-4 py-3">{data.concertName}</td>
									<td className="border px-4 py-3">
										{data.action === "RESERVE" ? "Reserve" : "Cancel"}
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
};

export default History;

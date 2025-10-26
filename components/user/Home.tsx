"use client";

import { useEffect, useState } from "react";
import DetailCard from "../concert-detail/DetailCard";
import axios from "axios";
import { useBaseStore } from "@/stores/base";

type ConcertResponseDto = {
	id: number;
	name: string;
	detail: string;
	numberOfSeats: string;
	reserved: string;
	isReserved: boolean;
	createdAt: boolean;
};

const API_BASE =
	process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";
const LIST_ENDPOINT = `${API_BASE}/user/concerts`;

const Home = () => {
	const [rows, setRows] = useState<ConcertResponseDto[]>([]);
	const [loading, setLoading] = useState(true);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const { isRefetch, setIsRefetch } = useBaseStore();

	const fetchData = async () => {
		try {
			setLoading(true);
			setErrorMsg(null);
			const res = await axios.get<ConcertResponseDto[]>(LIST_ENDPOINT, {
				headers: { "Content-Type": "application/json" },
			});
			setRows(Array.isArray(res.data) ? res.data : []);
		} catch (err: any) {
			const apiMessage =
				err?.response?.data?.message ||
				err?.response?.data?.error ||
				err?.message ||
				"Failed to load concerts.";
			setErrorMsg(String(apiMessage));
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (!isRefetch) return;
		fetchData();
		setIsRefetch(false);
	}, [isRefetch]);

	return (
		<div className="flex flex-col gap-12">
			{loading && (
				<div className="text-base text-[#5C5C5C]">Loading concerts…</div>
			)}
			{errorMsg && <div className="text-red-600 text-base">{errorMsg}</div>}
			{!loading && !errorMsg && rows.length === 0 && (
				<div className="text-base text-[#5C5C5C]">No concerts found.</div>
			)}

			{!loading &&
				!errorMsg &&
				rows.map((data) => {
					return (
						<DetailCard
							key={data.id}
							id={data.id}
							title={data.name}
							detail={data.detail}
							seats={data.numberOfSeats}
							status={data.isReserved}
						/>
					);
				})}
		</div>
	);
};

export default Home;

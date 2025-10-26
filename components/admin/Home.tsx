"use client";

import { useEffect, useState } from "react";
import Card, { CardType } from "../Card";
import DetailCard from "../concert-detail/DetailCard";
import CreateCard from "../concert-detail/CreateCard";
import axios from "axios";
import { useBaseStore } from "@/stores/base";

type ConcertResponseDto = {
	id: number;
	name: string;
	detail: string;
	numberOfSeats: string;
	reserved: string;
	createdAt: boolean;
};

type Totals = {
	totalSeats: number;
	totalReserved: number;
	totalCancel: number;
};

const API_BASE =
	process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";
const LIST_ENDPOINT = `${API_BASE}/admin/concerts`;
const TOTAL_URL = `${API_BASE}/admin/totals`;

const Home = () => {
	const [rows, setRows] = useState<ConcertResponseDto[]>([]);
	const [totals, setTotals] = useState<Totals>({
		totalSeats: 0,
		totalReserved: 0,
		totalCancel: 0,
	});
	const [loading, setLoading] = useState(true);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [tab, setTab] = useState("overview");
	const { isRefetch, setIsRefetch } = useBaseStore();

	const fetchData = async () => {
		try {
			setLoading(true);
			setErrorMsg(null);
			const res = await axios.get<ConcertResponseDto[]>(LIST_ENDPOINT, {
				headers: { "Content-Type": "application/json" },
			});
			const resTotal = await axios.get<Totals>(TOTAL_URL, {
				headers: { "Content-Type": "application/json" },
			});
			setRows(Array.isArray(res.data) ? res.data : []);
			setTotals(resTotal.data);
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
		<div className="flex flex-col">
			<div className="flex flex-col md:flex-row gap-[35px]">
				<Card type={CardType.SEATS} count={totals.totalSeats} />
				<Card type={CardType.RESERVE} count={totals.totalReserved} />
				<Card type={CardType.CANCEL} count={totals.totalCancel} />
			</div>

			<div className="flex text-2xl mt-12 mb-5">
				<div
					className={`flex py-[10px] px-4 hover:text-[#1692EC] hover:border-b-2 hover:border-[#1692EC] hover:cursor-pointer ${
						tab === "overview" && "text-[#1692EC] border-b-2 border-[#1692EC]"
					}`}
					onClick={() => setTab("overview")}
				>
					Overview
				</div>
				<div
					className={`flex py-[10px] px-4 hover:text-[#1692EC] hover:border-b-2 hover:border-[#1692EC] hover:cursor-pointer ${
						tab === "create" && "text-[#1692EC] border-b-2 border-[#1692EC]"
					}`}
					onClick={() => setTab("create")}
				>
					Create
				</div>
			</div>

			{tab === "overview" ? (
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
									status={false}
								/>
							);
						})}
				</div>
			) : (
				<CreateCard setTab={setTab} />
			)}
		</div>
	);
};

export default Home;

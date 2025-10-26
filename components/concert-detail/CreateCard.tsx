"use client";

import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useBaseStore } from "@/stores/base";

type CreateConcertPayload = {
	name: string;
	detail: string;
	numberOfSeats: number;
};

const API_BASE =
	process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";
const CREATE_ENDPOINT = `${API_BASE}/admin/create-concert`;

const CreateCard = ({
	setTab,
}: {
	setTab: Dispatch<SetStateAction<string>>;
}) => {
	const [form, setForm] = useState({
		name: "",
		detail: "",
		numberOfSeats: "" as string | number,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [successMsg, setSuccessMsg] = useState<string | null>(null);
	const { setIsRefetch } = useBaseStore();

	const onChange =
		(key: keyof typeof form) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setForm((s) => ({ ...s, [key]: e.target.value }));
		};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMsg(null);
		setSuccessMsg(null);

		const numberVal = Number(form.numberOfSeats);
		if (!form.name.trim()) return setErrorMsg("Please input concert name.");
		if (!form.detail.trim()) return setErrorMsg("Please input description.");
		if (!Number.isFinite(numberVal) || numberVal <= 0) {
			return setErrorMsg("Total of seat must be a number > 0.");
		}

		const payload: CreateConcertPayload = {
			name: form.name.trim(),
			detail: form.detail.trim(),
			numberOfSeats: numberVal,
		};

		try {
			setIsSubmitting(true);
			const res = await axios.post(CREATE_ENDPOINT, payload, {
				headers: { "Content-Type": "application/json" },
			});

			toast.success("Create successfully", {
				position: "top-right",
			});
			setIsRefetch(true);
			setTab("overview");
			setForm({ name: "", detail: "", numberOfSeats: "" });
		} catch (err: any) {
			const apiMessage =
				err?.response?.data?.message ||
				err?.response?.data?.error ||
				err?.message ||
				"Failed to create concert.";
			setErrorMsg(String(apiMessage));
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-6 border border-[#C2C2C2] rounded bg-white p-10"
		>
			<h1 className="text-[#1692EC] text-[40px] font-semibold">Create</h1>
			<hr className="border-[#C2C2C2]" />

			<div className="text-2xl flex gap-6 flex-col md:flex-row">
				<div className="flex flex-col gap-4 w-full">
					Concert Name
					<input
						type="text"
						name="name"
						value={form.name}
						onChange={onChange("name")}
						className="border border-[#5C5C5C] px-4 py-3 text-base rounded focus:outline-0"
						placeholder="Please input concert name"
					/>
				</div>

				<div className="flex flex-col gap-4 w-full">
					Total of seat
					<div className="relative w-full">
						<input
							type="number"
							inputMode="numeric"
							name="numberOfSeats"
							value={form.numberOfSeats}
							onChange={onChange("numberOfSeats")}
							className="w-full border border-[#5C5C5C] px-4 py-3 text-base rounded focus:outline-0"
							placeholder="Total of seat"
							min={1}
						/>
						<img
							src="icon/user-black.svg"
							width={24}
							height={24}
							alt="user"
							className="absolute right-3 -mt-[38px]"
						/>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-4 w-full text-2xl">
				Description
				<textarea
					name="detail"
					value={form.detail}
					onChange={onChange("detail")}
					className="border border-[#5C5C5C] px-4 py-3 text-base rounded focus:outline-0"
					placeholder="Please input description"
					rows={4}
				/>
			</div>

			{errorMsg && (
				<div className="text-red-600 text-base -mt-2">{errorMsg}</div>
			)}
			{successMsg && (
				<div className="text-green-600 text-base -mt-2">{successMsg}</div>
			)}

			<div className="flex justify-end">
				<button
					type="submit"
					disabled={isSubmitting}
					className="py-4 px-[28.5px] rounded gap-2 flex items-center text-white text-2xl cursor-pointer disabled:opacity-60"
					style={{ backgroundColor: "#1692EC" }}
				>
					<img src="icon/save.svg" width={24} height={24} alt="save" />
					{isSubmitting ? "Saving..." : "Save"}
				</button>
			</div>
		</form>
	);
};

export default CreateCard;

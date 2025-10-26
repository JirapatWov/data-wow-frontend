"use client";

const CreateCard = () => {
	return (
		<div className="flex flex-col gap-6 border border-[#C2C2C2] rounded bg-white p-10">
			<h1 className="text-[#1692EC] text-[40px] font-semibold">Create</h1>
			<hr className="border-[#C2C2C2]" />
			<div className="text-2xl flex gap-6">
				<div className="flex flex-col gap-4 w-full">
					Concert Name
					<input
						type="text"
						name="name"
						className="border border-[#5C5C5C] px-4 py-3 text-base rounded focus:outline-0"
						placeholder="Please input concert name"
					/>
				</div>
				<div className="flex flex-col gap-4 w-full">
					Total of seat
					<div className="relative w-full">
						<input
							type="text"
							name="numberOfSeats"
							className="w-full border border-[#5C5C5C] px-4 py-3 text-base rounded focus:outline-0"
							placeholder="Total of seat"
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
					name="name"
					className="border border-[#5C5C5C] px-4 py-3 text-base rounded focus:outline-0"
					placeholder="Please input description"
				/>
			</div>
			<div className="flex justify-end">
				<button
					className="py-4 px-[28.5px] rounded gap-2 flex text-white text-2xl cursor-pointer"
					style={{
						backgroundColor: "#1692EC",
					}}
				>
					<img src="icon/save.svg" width={24} height={24} alt="save" />
					Save
				</button>
			</div>
		</div>
	);
};

export default CreateCard;

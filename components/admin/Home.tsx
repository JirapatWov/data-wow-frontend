"use client";

import { useState } from "react";
import Card, { CardType } from "../Card";

const Home = () => {
	const [tab, setTab] = useState("overview");
	return (
		<div className="flex flex-col">
			<div className="flex gap-[35px]">
				<Card type={CardType.SEATS} count={30} />
				<Card type={CardType.RESERVE} count={30} />
				<Card type={CardType.CANCEL} count={30} />
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
		</div>
	);
};

export default Home;

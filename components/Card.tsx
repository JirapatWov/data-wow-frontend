export enum CardType {
	SEATS = "SEATS",
	RESERVE = "RESERVE",
	CANCEL = "CANCEL",
}

const typeMapping = {
	[CardType.SEATS]: {
		icon: "icon/user.svg",
		title: "Total of seats",
		color: "#0070A4",
	},
	[CardType.RESERVE]: {
		icon: "icon/award.svg",
		title: "Reserve",
		color: "#00A58B",
	},
	[CardType.CANCEL]: {
		icon: "icon/x-circle.svg",
		title: "Cancel",
		color: "#E84E4E",
	},
};

const Card = ({ type, count }: { type: CardType; count: number }) => {
	return (
		<div
			className="flex flex-col gap-[10px] items-center rounded-lg w-full text-white p-6"
			style={{ backgroundColor: typeMapping[type].color }}
		>
			<img
				src={typeMapping[type].icon}
				width={40}
				height={40}
				alt={typeMapping[type].title}
			/>
			<div className="text-2xl">{typeMapping[type].title}</div>
			<div className="text-6xl py-4">{count}</div>
		</div>
	);
};

export default Card;

"use client";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import {Line} from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LineChart({eggName, eggWeights, incubationDays}) {
	if (!eggWeights) return;
	const initialEggWeight = eggWeights[0].egg_weight;
	const labels = eggWeights.map((item) => item.created_at.split("T")[0].split("-").reverse().join("-"));
	const data = {
		labels,
		datasets: [
			{
				label: "15.5% wilgotności",
				data: labels.map(() => initialEggWeight + (initialEggWeight * 15.5) / 100 / incubationDays),
				borderColor: "red",
				backgroundColor: "red",
			},
			{
				label: "14.5% wilgotności",
				data: labels.map(() => initialEggWeight - (initialEggWeight * 14.5) / 100 / incubationDays),
				borderColor: "red",
				backgroundColor: "red",
			},
			{
				label: "Jajo",
				data: eggWeights.map((item) => item.egg_weight),
				borderColor: "blue",
				backgroundColor: "blue",
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: eggName,
			},
		},
	};
	return <Line options={options} data={data} />;
}

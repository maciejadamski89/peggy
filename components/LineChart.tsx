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
import {useState} from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LineChart({eggName, eggWeights, incubationDays}: any) {
	const [zoom, setZoom] = useState(false);
	if (!eggName) throw new Error("eggName is required");
	if (!eggWeights) throw new Error("eggWeights is required");
	if (!eggWeights) throw new Error("incubationDays is required");

	const initialEggWeight = eggWeights.filter((item: any) => item.initial_weight);
	const {weight, created_at} = initialEggWeight[0];
	const labels: string[] = [];

	for (let i = 0; i < incubationDays; i++) {
		const localTimezoneOffset = new Date().getTimezoneOffset();
		const localTimezoneOffsetHours = localTimezoneOffset / 60;
		let localDateTime = new Date(created_at);
		const localDateTimeHours = localDateTime.getHours();
		localDateTime.setHours(localDateTimeHours - localTimezoneOffsetHours);
		localDateTime.setDate(localDateTime.getDate() + i);
		labels.push(
			localDateTime.toLocaleString("pl-PL", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			}),
		);
	}

	const dataUpperLimit = [];

	for (let eachIncubationDay = 0; eachIncubationDay < incubationDays; eachIncubationDay++) {
		const percentage = weight * 0.14;
		const lostWeightEveryDay = percentage / incubationDays;
		dataUpperLimit.push(weight - eachIncubationDay * lostWeightEveryDay);
	}

	const dataLowerLimit: number[] = [];

	for (let eachIncubationDay = 0; eachIncubationDay <= incubationDays; eachIncubationDay++) {
		const percentage = weight * 0.16;
		const lostWeightEveryDay = percentage / incubationDays;
		dataLowerLimit.push(weight - eachIncubationDay * lostWeightEveryDay);
	}

	const data = {
		labels,
		datasets: [
			{
				label: "16% wilgotności",
				data: dataLowerLimit,
				borderColor: "gray",
				backgroundColor: "gray",
				borderWidth: 1,
				borderDash: [5, 5],
				pointRadius: 0,
			},
			{
				label: "14% wilgotności",
				data: dataUpperLimit,
				borderColor: "black",
				backgroundColor: "black",
				borderWidth: 1,
				borderDash: [5, 5],
				pointRadius: 0,
			},
			{
				label: "Jajo",
				data: eggWeights.map((item: any) => item.weight),
				borderColor: "indigo",
				backgroundColor: "indigo",
				borderWidth: 2,
			},
		],
	};

	const handleZoom = (event: any, chart: any) => {
		const yScale = chart.scales["y-axis-0"];
		if (zoom) {
			yScale.options.ticks.min = yScale.min;
			yScale.options.ticks.max = yScale.max;
		} else {
			const mousePosition = chart.chartInstance.chart.canvas.getBoundingClientRect().top;
			const chartArea = chart.chartInstance.chartArea.top;
			const scaleRatio = (chartArea - event.clientY + mousePosition) / chartArea;
			const min = yScale.min + (yScale.max - yScale.min) * scaleRatio;
			const max = yScale.max - (yScale.max - yScale.min) * (1 - scaleRatio);
			yScale.options.ticks.min = min;
			yScale.options.ticks.max = max;
		}
		setZoom(!zoom);
		chart.chartInstance.update();
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
		onZoom: handleZoom,
	};
	return (
		<>
			{eggWeights.length === 1 ? (
				<p>Dziś jest pierwszy dzień jajka. Nie posiadam jeszcze danych aby wygenerować wykres.</p>
			) : (
				<Line options={options} data={data} />
			)}
		</>
	);
}

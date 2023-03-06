import Link from "next/link";
import supabase from "@/utils/supabase";
import LineChart from "@/components/LineChart";

export const revalidate = 0;

async function fetchEggWeights(eggId) {
	const {data, error} = await supabase.from("egg-weights").select().eq("egg_id", eggId);
	console.log({data});
	if (error) console.error(error);
	return data;
}

async function getIncubationDays(eggId) {
	const {data, error} = await supabase.from("egg-incubation-days").select().eq("egg_id", eggId).single();
	if (error) console.error(error);
	return data;
}

async function fetchEggName(eggId) {
	const {data, error} = await supabase.from("eggs").select().eq("id", eggId).single();
	if (error) console.error(error);
	return data;
}

export default async function EggIncubation({params}) {
	const eggWeights = await fetchEggWeights(params.eggId);
	const incubationDays = await getIncubationDays(params.eggId);
	const eggName = await fetchEggName(params.eggId);
	console.log({eggWeights});
	console.log({incubationDays});
	console.log({eggName});
	return (
		<div className="px-4 mx-auto space-y-8 max-w-7xl sm:px-6 lg:px-8">
			<Link href="/">Home Page</Link>
			<LineChart eggName={eggName.egg_name} eggWeights={eggWeights} incubationDays={incubationDays.days} />
			{/* <Line options={options} data={chartData.datasets} />
			<div className="flex items-center justify-center max-w-xl mx-auto space-x-4">
				<Input title="Waga jajka [g]" width="w-[5rem]" handleOnChange={handleOnChange} />
				<Button title="Dodaj" handleOnClick={handleOnClick} />
			</div> */}
		</div>
	);
}

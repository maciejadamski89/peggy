import Link from "next/link";
import supabase from "@/utils/supabase";
import LineChart from "@/components/LineChart";
import EggWeightsTable from "@/components/EggWeightsTable";
import FormEggWeight from "@/components/FormEggWeight";

export const revalidate = 0;

async function fetchEggWeights(eggId: number) {
	const {data, error} = await supabase.from("egg-weights").select().eq("egg_id", eggId);
	if (error) console.error(error);
	return data;
}

async function fetchIncubationDays(eggId: number) {
	const {data, error} = await supabase.from("eggs").select().eq("id", eggId).single();
	if (error) console.error(error);
	return data?.incubation_days;
}

async function fetchEggName(eggId: number) {
	const {data, error} = await supabase.from("eggs").select().eq("id", eggId).single();
	if (error) console.error(error);
	return data?.name;
}

export default async function EggIncubation({params}: any) {
	const eggName = await fetchEggName(params.eggId);
	const incubationDays = await fetchIncubationDays(params.eggId);
	const eggWeights = await fetchEggWeights(params.eggId);
	return (
		<div className="px-4 mx-auto space-y-8 max-w-7xl sm:px-6 lg:px-8">
			<Link href="/">Home Page</Link>
			<LineChart eggName={eggName} eggWeights={eggWeights} incubationDays={incubationDays} />
			<FormEggWeight eggId={params.eggId} />
			<EggWeightsTable eggs={eggWeights} />
		</div>
	);
}

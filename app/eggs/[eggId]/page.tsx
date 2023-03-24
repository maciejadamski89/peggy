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
		<div className="p-4 mx-auto space-y-8 max-w-7xl sm:px-6 lg:px-8">
			<ol className="flex items-center min-w-0 whitespace-nowrap" aria-label="Breadcrumb">
				<li className="text-sm">
					<Link className="flex items-center text-gray-500 hover:text-indigo-500" href="/">
						Strona główna
						<svg
							className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-400"
							width={16}
							height={16}
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
								stroke="currentColor"
								strokeWidth={2}
								strokeLinecap="round"
							/>
						</svg>
					</Link>
				</li>
				<li className="text-sm">
					<Link className="flex items-center text-gray-500 hover:text-indigo-500" href="/eggs">
						Jajka
						<svg
							className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-400"
							width={16}
							height={16}
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
								stroke="currentColor"
								strokeWidth={2}
								strokeLinecap="round"
							/>
						</svg>
					</Link>
				</li>
				<li className="text-sm font-semibold text-indigo-600 truncate" aria-current="page">
					{eggName}
				</li>
			</ol>

			<LineChart eggName={eggName} eggWeights={eggWeights} incubationDays={incubationDays} />
			<div className="flex items-center">
				<FormEggWeight eggId={params.eggId} />
			</div>
			<EggWeightsTable eggs={eggWeights} />
		</div>
	);
}

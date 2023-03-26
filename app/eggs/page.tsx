import supabase from "@/utils/supabase";
import Link from "next/link";
import EggsTable from "@/components/EggsTable";
import Card from "@/components/Card";

export const metadata = {
	title: "Peggy - Lista jaj",
};

export const revalidate = 0;

async function getEggs() {
	const {data, error} = await supabase.from("eggs").select().order("created_at");
	if (error) console.error(error);
	return data;
}

export default async function Eggs() {
	const eggs = await getEggs();
	return (
		<main className="flex flex-col items-center justify-center p-10 mx-auto space-y-4">
			<Link
				href="/eggs/insert"
				className="inline-flex justify-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
			>
				Dodaj
			</Link>
			<div className="hidden lg:block">
				<EggsTable eggs={eggs} />
			</div>
			<div className="flex flex-col gap-4 lg:hidden">
				{eggs && eggs.map((egg) => <Card key={egg.id} egg={egg} />)}
			</div>
		</main>
	);
}

import supabase from "@/utils/supabase";
import Link from "next/link";
import EggsTable from "@/components/EggsTable";

export const revalidate = 0;

async function getEggs() {
	const {data, error} = await supabase.from("eggs").select().order("created_at");
	if (error) console.error(error);
	return data;
}

export default async function Home() {
	console.count();
	console.log("RENDER GET");
	const eggs = await getEggs();
	console.log("EGGS");
	console.log({eggs});
	return (
		<main className="flex flex-col items-center justify-center p-10 mx-auto space-y-4">
			<Link
				href="/eggs/insert"
				className="inline-flex items-center justify-center gap-2 px-4 py-3 mt-10 text-sm font-semibold text-white transition-all bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
				</svg>
			</Link>
			<EggsTable eggs={eggs} />
		</main>
	);
}

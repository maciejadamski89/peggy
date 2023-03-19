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
	const eggs = await getEggs();
	return (
		<main className="flex flex-col items-center justify-center p-10 mx-auto space-y-4">
			<Link
				href="/eggs/insert"
				className="inline-flex justify-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
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

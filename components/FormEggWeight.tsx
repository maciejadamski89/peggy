"use client";
import supabase from "@/utils/supabase";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function FormEggWeight({eggId}: {eggId: number}) {
	const [eggWeight, setEggWeight] = useState(0);
	const router = useRouter();

	const handleOnChangeEggWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEggWeight(+e.target.value);
	};

	const handleOnClick = async () => {
		const {error: eggWeightError} = await supabase
			.from("egg-weights")
			.insert({egg_id: eggId, weight: eggWeight})
			.select()
			.single();
		if (eggWeightError) console.error(eggWeightError);
		if (eggWeight) router.push(`/eggs/${eggId}`);
	};

	return (
		<div className="flex items-center justify-center p-4 mx-auto space-x-8">
			<div>
				<button
					className="inline-flex justify-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
					onClick={handleOnClick}
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
				</button>
			</div>
			<div>
				<label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
					Waga jaja [g]
				</label>
				<p className="text-sm text-gray-500">
					Podaj dokładną wagę jaja z dokładnością do dwóch zer po przecinku. Dla przykładu: 7.74.
				</p>
				<input
					type="text"
					name="first-name"
					id="first-name"
					className="mt-2 block w-[20rem] rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					onChange={handleOnChangeEggWeight}
				/>
			</div>
		</div>
	);
}

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
		<div className="mx-auto space-y-2">
			<label htmlFor="egg-weight" className="block text-sm font-semibold leading-6 text-gray-900">
				Waga jaja [g]
			</label>
			<p className="text-sm text-gray-500">
				Podaj dokładną wagę jaja z dokładnością do dwóch zer po przecinku. Dla przykładu: 7.74.
			</p>
			<input
				id="egg-weight"
				name="egg-weight"
				type="text"
				className="mt-2 block w-[20rem] rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				onChange={handleOnChangeEggWeight}
			/>
			<button
				className="justify-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm mt-5inline-flex hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
				onClick={handleOnClick}
			>
				Dodaj
			</button>
		</div>
	);
}

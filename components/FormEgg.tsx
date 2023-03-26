"use client";
import supabase from "@/utils/supabase";
import {useRouter} from "next/navigation";
import {useState} from "react";
import Link from "next/link";

export default function FormEgg({parrotGenres}: any) {
	const [eggName, setEggName] = useState("");
	const [initialEggWeight, setInitialEggWeight] = useState(0);
	const [parrotGenreIncubationDays, setParrotGenreIncubationDays] = useState(0);

	const router = useRouter();

	const handleOnChangeEggName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEggName(e.target.value);
	};

	const handleOnChangeInitialEggWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInitialEggWeight(+e.target.value);
	};

	const handleOnChangeParrotGenreIncubationDays = (e: React.ChangeEvent<HTMLInputElement>) => {
		setParrotGenreIncubationDays(+e.target.value);
	};

	const handleOnClick = async () => {
		const {data: egg, error} = await supabase
			.from("eggs")
			.insert({name: eggName, initial_weight: initialEggWeight, incubation_days: parrotGenreIncubationDays})
			.select()
			.single();
		if (error) console.error(error);

		const {data: eggWeight, error: eggWeightError} = await supabase
			.from("egg-weights")
			.insert({egg_id: egg?.id, initial_weight: true, weight: initialEggWeight, created_at: egg?.created_at})
			.select()
			.single();
		if (eggWeightError) console.error(eggWeightError);
		if (egg && eggWeight) router.push("/eggs");
	};

	return (
		<div className="p-8">
			<div className="mt-10 sm:mt-0">
				<div className="md:grid md:grid-cols-3 md:gap-6">
					<div className="md:col-span-1">
						<div className="px-4 sm:px-0">
							<h3 className="text-base font-semibold leading-6 text-gray-900">Dodawanie nowego jaja</h3>
							<p className="mt-1 text-sm text-gray-600">
								Wypełnij poniższy formularz aby dodać nowe jajo do bazy danych
							</p>
						</div>
					</div>
					<div className="mt-5 md:col-span-2 md:mt-0">
						<div className="overflow-hidden shadow sm:rounded-md">
							<div className="px-4 py-5 space-y-4 bg-white sm:p-6">
								<label
									htmlFor="egg-name"
									className="block text-sm font-semibold leading-6 text-gray-900"
								>
									Nazwa jaja
								</label>
								<p className="text-sm text-gray-500">
									Nazwa jaja musi być unikalna abyś mógł je później rozróżnić tutaj jak i w
									inkubatorze
								</p>
								<input
									type="text"
									name="egg-name"
									id="egg-name"
									className="mt-2 block w-[20rem] rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									onChange={handleOnChangeEggName}
								/>
								<label
									htmlFor="initial-egg-weight"
									className="block text-sm font-semibold leading-6 text-gray-900"
								>
									Początkowa waga jaja [g]
								</label>
								<p className="text-sm text-gray-500">
									Podaj dokładną wagę jaja z dokładnością do dwóch zer po przecinku. Dla przykładu:
									7.74.
								</p>
								<input
									type="text"
									name="initial-egg-weight"
									id="initial-egg-weight"
									className="mt-2 block w-[20rem] rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									onChange={handleOnChangeInitialEggWeight}
								/>
								<h1 className="mt-4 text-sm font-semibold leading-6 text-gray-900">
									Wybierz typ papugi
								</h1>
								<p className="text-sm text-gray-500">Każda papuga posiada różny okres inkubacji jaja</p>
								<div className="mt-4 space-y-4">
									{parrotGenres.map((genre: any) => (
										<div key={genre.id} className="flex items-center">
											<input
												id={`${genre.name}`}
												name={`${genre.name}`}
												type="radio"
												className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
												value={genre.incubation_days}
												onChange={handleOnChangeParrotGenreIncubationDays}
											/>
											<label
												htmlFor={`${genre.name}`}
												className="block ml-3 text-sm font-medium leading-6 text-gray-900"
											>
												{genre.name}
											</label>
										</div>
									))}
								</div>
							</div>
							<div className="px-4 py-3 space-x-4 text-right bg-gray-50 sm:px-6">
								<Link href="/eggs">
									<button
										type="button"
										className="inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
									>
										Anuluj
									</button>
								</Link>
								<button
									type="button"
									className="inline-flex justify-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
									onClick={handleOnClick}
								>
									Zapisz
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

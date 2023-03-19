// import ButtonDeleteEgg from "./ButtonDeleteEgg";
import Link from "next/link";

export default function EggWeightsTable({eggs}: {eggs: any}) {
	const convertDate = (date: string) => {
		const localTimezoneOffset = new Date().getTimezoneOffset();
		const localTimezoneOffsetHours = localTimezoneOffset / 60;
		let localDateTime = new Date(date);
		const localDateTimeHours = localDateTime.getHours();
		localDateTime.setHours(localDateTimeHours - localTimezoneOffsetHours);
		return localDateTime.toLocaleString("pl-PL", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const generateHatchDate = (date: string, incubationDays: number) => {
		const localTimezoneOffset = new Date().getTimezoneOffset();
		const localTimezoneOffsetHours = localTimezoneOffset / 60;
		let localDateTime = new Date(date);
		const localDateTimeHours = localDateTime.getHours();
		localDateTime.setHours(localDateTimeHours - localTimezoneOffsetHours);
		localDateTime.setDate(localDateTime.getDate() + incubationDays);
		return localDateTime.toLocaleString("pl-PL", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const generateTryShutdownDate = (date: string, incubationDays: number) => {
		const daysBeforeHatch = 3;
		const localTimezoneOffset = new Date().getTimezoneOffset();
		const localTimezoneOffsetHours = localTimezoneOffset / 60;
		let localDateTime = new Date(date);
		const localDateTimeHours = localDateTime.getHours();
		localDateTime.setHours(localDateTimeHours - localTimezoneOffsetHours);
		localDateTime.setDate(localDateTime.getDate() + (incubationDays - daysBeforeHatch));
		return localDateTime.toLocaleString("pl-PL", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<div className="flex flex-col max-w-2xl mx-auto">
			<div className="-m-1.5 overflow-x-auto">
				<div className="p-1.5 min-w-full inline-block align-middle">
					<div className="overflow-hidden">
						<table className="min-w-full divide-y divide-gray-200 ">
							<thead>
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase"
									>
										Data dodania wagi
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase"
									>
										Waga jajka
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-xs font-medium text-right text-gray-500 uppercase"
									>
										Akcje
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 ">
								{eggs?.map((egg: any) => (
									<tr key={egg.id}>
										<td className="px-5 py-4 text-sm font-medium text-gray-800 whitespace-nowrap ">
											{convertDate(egg.created_at)}
										</td>
										<td className="px-5 py-4 text-sm font-medium text-gray-800 whitespace-nowrap ">
											{egg.weight}
										</td>
										<td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
											<button
												type="button"
												className="inline-flex justify-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
												// onClick={handleOnClick}
											>
												Usuń
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

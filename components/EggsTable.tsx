// import ButtonDeleteEgg from "./ButtonDeleteEgg";
import Link from "next/link";
import {convertDate, generateHatchDate, generateTryShutdownDate} from "@/utils/functions";

export default function EggsTable({eggs}: {eggs: any}) {
	return (
		<div className="flex flex-col">
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
										Nazwa jaja papugi
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase"
									>
										Liczba dni inkubacji
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase"
									>
										Data dodania
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase"
									>
										Data wyłączenia tacki
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase"
									>
										Data klucia
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
										<td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
											<Link
												href={`/eggs/${egg.id}`}
												className="text-indigo-600 underline hover:text-indigo-500"
											>
												{egg.name}
											</Link>
										</td>
										<td className="px-5 py-4 text-sm font-medium text-gray-800 whitespace-nowrap ">
											{egg.incubation_days}
										</td>
										<td className="px-5 py-4 text-sm font-medium text-gray-800 whitespace-nowrap ">
											{convertDate(egg.created_at)}
										</td>
										<td className="px-5 py-4 text-sm font-medium text-gray-800 whitespace-nowrap ">
											{generateTryShutdownDate(egg.created_at, egg.incubation_days)}
										</td>
										<td className="px-5 py-4 text-sm font-medium text-gray-800 whitespace-nowrap ">
											{generateHatchDate(egg.created_at, egg.incubation_days)}
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

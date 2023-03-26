// import ButtonDeleteEgg from "./ButtonDeleteEgg";
import {convertDate} from "@/utils/functions";

export default function EggWeightsTable({eggs}: {eggs: any}) {
	return (
		<div className="flex flex-col max-w-xl mx-auto">
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

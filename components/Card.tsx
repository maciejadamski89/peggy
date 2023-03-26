import {convertDate, generateHatchDate, generateTryShutdownDate, calculateEndEggWeight} from "@/utils/functions";

export default function Card({egg}: any) {
	return (
		<div className="flex flex-col bg-white border shadow-sm rounded-xl">
			<div className="px-4 py-3 bg-indigo-600 border-b rounded-t-xl md:py-4 md:px-5">
				<h3 className="text-lg font-medium text-white">{egg.name}</h3>
			</div>
			<div className="px-10 py-4 md:p-5">
				<div className="py-2 mx-auto">
					<p className="text-sm font-medium text-gray-800">Data dodania</p>
					<p className="text-sm font-medium text-gray-500">{convertDate(egg.created_at)}</p>
				</div>
				<div className="py-2 mx-auto">
					<p className="text-sm font-medium text-gray-800">Liczba dni inkubnacji</p>
					<p className="text-sm font-medium text-gray-500">{egg.incubation_days}</p>
				</div>
				<div className="py-2 mx-auto">
					<p className="text-sm font-medium text-gray-800">Waga początkowa</p>
					<p className="text-sm font-medium text-gray-500">{egg.initial_weight}</p>
				</div>
				<div className="py-2 mx-auto">
					<p className="text-sm font-medium text-gray-800">Waga końcowa</p>
					<p className="text-sm font-medium text-gray-500">
						{calculateEndEggWeight(egg.initial_weight, egg.incubation_days)}
					</p>
				</div>
				<div className="py-2 mx-auto">
					<p className="text-sm font-medium text-gray-800">Data wyłączenia tacki</p>
					<p className="text-sm font-medium text-gray-500">
						{generateTryShutdownDate(egg.created_at, egg.incubation_days)}
					</p>
				</div>
				<div className="py-2 mx-auto">
					<p className="text-sm font-medium text-gray-800">Data klucia</p>
					<p className="text-sm font-medium text-gray-500">
						{generateHatchDate(egg.created_at, egg.incubation_days)}
					</p>
				</div>
				<a
					className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-indigo-600 underline hover:text-indigo-500"
					href={`/eggs/${egg.id}`}
				>
					Szczegóły
					<svg
						className="w-2.5 h-auto"
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
				</a>
			</div>
		</div>
	);
}

type props = {
	name: string;
	options: string[];
	defaultValue: string;
};

export default function RadioGroup({name, options, defaultValue}: props) {
	return (
		<div className="flex flex-col gap-y-3">
			{options.map((option: any, index: number) => (
				<div className="flex" key={index}>
					<input
						type="radio"
						name={name}
						className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500"
						id={option.id}
						value={option.incubation_days}
					/>
					<label htmlFor={option} className="ml-2 text-sm text-gray-900">
						{option.genre}
					</label>
				</div>
			))}
		</div>
	);
}

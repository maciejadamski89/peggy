type props = {
	title: string;
	handleOnClick: () => onClickType;
};

export default function Button({title, handleOnClick}: props) {
	return (
		<button
			type="button"
			className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white transition-all bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			onClick={handleOnClick}
		>
			{title}
		</button>
	);
}

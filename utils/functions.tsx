export function convertDate(date: string) {
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
}

export function generateHatchDate(date: string, incubationDays: number) {
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
}

export function generateTryShutdownDate(date: string, incubationDays: number) {
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
}

export function calculateEndEggWeight(initialWeight: number, incubationDays: number) {
	const weightDecreasePercentage = 15 / 100;
	return (initialWeight - initialWeight * weightDecreasePercentage).toFixed(3);
}

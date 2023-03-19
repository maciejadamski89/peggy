import Link from "next/link";

export default function Home() {
	return (
		<div className="flex items-center justify-center h-screen">
			<Link href="/eggs" className="text-xl text-blue-500 underline hover:text-blue-700">
				Jajka
			</Link>
		</div>
	);
}

import supabase from "@/utils/supabase";
import FormEgg from "@/components/FormEgg";

async function fetchParrotGenres() {
	const {data, error} = await supabase.from("parrot-genres").select().order("name");
	if (error) console.error(error);
	return data;
}

export default async function Page() {
	const parrotGenres = await fetchParrotGenres();
	return <FormEgg parrotGenres={parrotGenres} />;
}

import supabase from "./supabase";

export default async function pushToDatabase() {
	const {data, error} = await supabase.from("eggs").insert({parrot_name: "dupa", egg_weight: 6}).order("create_at");
}

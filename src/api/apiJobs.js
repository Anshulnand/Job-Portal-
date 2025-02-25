import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery } = {}) {
  const supabase = await supabaseClient(token);


  // ✅ Debugging: Log Supabase instance  
  console.log("Supabase Instance:", supabase);

  if (!supabase) {
    console.error("Supabase client is not initialized!");
    return null;
  }

  let query = supabase.from("jobs").select("*, company: companies(name, logo_url)");

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Supabase Query Error:", error);
    return null;
  }

  console.log("Supabase Query Success:", data);
  return data;
}

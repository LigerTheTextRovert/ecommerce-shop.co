import { supabase } from "./supabase";
import watches from "./watches_dataset.json";

export const handleAddWatches = async () => {
  const { data, error } = await supabase.from("watches").insert(watches);
  if (error) return "An error has accoured";
  else return data;
};

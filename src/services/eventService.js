import { supabase } from "./supabase_api";

export const fetchEvent = async ( date ) => {
  const { data, error } = await supabase
    .from('events')
    .select()
    .eq('date', date)
    .single();
  if(error) {
    throw error;
  }
  return data;
}

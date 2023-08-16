import { supabase } from "./supabase_api";

export const fetchMember = async ( user_id ) => {
  const { data, error } = await supabase
    .from('members')
    .select()
    .eq('user_id', user_id )
    .single();
  if(error) {
    throw error;
  }
  return data;
}
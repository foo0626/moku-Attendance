import { supabase } from "./supabase_api";


export const fetchAttendances = async (event_id) => {
  const { data, error } = await supabase
      .from('attendances')
      .select(`
        *,
        members(username, gender)
      `)
      .eq('event_id', event_id);
  if(error){
    throw error;
  }
  return data;
}


export const fetchAttendance = async ( member_id, event_id ) => {
  const { data, error } = await supabase
    .from('attendances')
    .select()
    .eq('member_id', member_id)
    .eq('event_id', event_id)
  if(error) {
    throw error;
  }
  if(data.length === 0){
    return null;
  }
  return data[0];
}


// attendance_data : {
//   user_id:
//   title:
//   content:
// }

export const saveAttendance = async ({ attendance_id, attendance_data }) => {
  if (attendance_id) {
    const { error } = await supabase
      .from('attendances')
      .update({ ...attendance_data})
      .eq('id', attendance_id);
    if (error) {
      throw error;
    }
    return attendance_id;
  } else {
    const { error } = await supabase.from('attendances').insert({ ...attendance_data });
    if (error) {
      throw error;
    }
  }
};


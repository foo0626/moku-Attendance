import { supabase } from "./supabase_api";

export const fetchAttendance = async ( user_id, event_id ) => {
  const { data, error } = await supabase
    .from('attendances')
    .select()
    .eq('user_id', user_id)
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
      .from('tasks')
      .update({ ...attendance_data, updated_at: new Date().toISOString() })
      .eq('id', attendance_id);
    if (error) {
      throw error;
    }
    return attendance_id;
  } else {
    const { error } = await supabase.from('tasks').insert({ ...attendance_data });
    if (error) {
      throw error;
    }
    // データの追加が成功したときは、そのデータのidを取得する。
    const { data, error: selectError } = await supabase
      .from('tasks')
      .select('id')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();
    if (selectError) {
      throw selectError;
    }
    return data.id;
  }
};


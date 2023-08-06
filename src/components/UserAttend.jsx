import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAttendance, saveAttendance } from '../services/attendService';
import { fetchEvent } from '../services/eventService';
import { useSelector } from 'react-redux';

const UserAttend = () => {

  const user = useSelector((state) => state.user);
  const user_id = user.user.id
  const [eventID, setEventID] = useState(null);
  const [attend, setAttend] = useState(false);

  const [searchParams] = useSearchParams();
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const day = searchParams.get('day');
  const date = `${year}-${month}-${day}`;

  

  useEffect( () => {
    const fetch = async () => {
      const event = await fetchEvent(date)
      if(event){
        setEventID(event.id)
        const attendance = await fetchAttendance(user_id,event.id);
        if(attendance){
          setAttend(attendance.attend)
        }
      }
    }

    fetch()
  },[])

  console.log(user_id)

  
  // saveAttendance({ attendance_id, attendance_data })
  
  return (
    <>
      <h1>出欠登録</h1>
      <p>年: {year}</p>
      <p>月: {month}</p>
      <p>日: {day}</p>
    </>
  );
};

export default UserAttend;

// const ({ id: attendance_id, ...attendance_data})
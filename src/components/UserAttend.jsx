import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchAttendance, saveAttendance } from '../services/attendService';
import { fetchEvent } from '../services/eventService';
import { useSelector } from 'react-redux';
import { Button, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'


const homeUrl = process.env.PUBLIC_URL;

const UserAttend = () => {

  const navigate = useNavigate()

  const user = useSelector((state) => state.user);
  const user_id = user.user.id

  const [eventID, setEventID] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [radioAttend, setRadioAttend] = useState('欠席')

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
          setAttendance(attendance)
          if(attendance.attend){
            setRadioAttend('出席')
          }
        }
      }
    }

    fetch()
  },[])

  
  // saveAttendance({ attendance_id, attendance_data })

  const onRegisterButtonClick = () => {

    const attendance_id = attendance?.id;

    saveAttendance({
      attendance_id,
      attendance_data:{
        user_id,
        event_id: eventID,
        attend: radioAttend === "出席"
      }
    })

    navigate(`${homeUrl}/`)
  }
   
  return (
    <>
      <h1>出欠登録</h1>
      <Text>{`${year}年${month}月${day}日`}</Text>
      <RadioGroup onChange={setRadioAttend} value={radioAttend}>
        <Stack direction='row'>
          <Radio value="出席">出席</Radio>
          <Radio value="欠席">欠席</Radio>
        </Stack>
      </RadioGroup>
      <Button onClick={onRegisterButtonClick}>登録</Button>
    </>
  );
};

export default UserAttend;

// const ({ id: attendance_id, ...attendance_data})
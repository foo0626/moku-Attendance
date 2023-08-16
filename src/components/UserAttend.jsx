import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchAttendance, fetchAttendances, saveAttendance } from '../services/attendService';
import { fetchEvent } from '../services/eventService';
import { useSelector } from 'react-redux';
import { Button, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'


const homeUrl = process.env.PUBLIC_URL;

const UserAttend = () => {

  const navigate = useNavigate()

  const member = useSelector((state) => state.member);

  const [eventID, setEventID] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [attendances, setAttendances] = useState([]);
  const [radioAttend, setRadioAttend] = useState('欠席');

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
        const attendance = await fetchAttendance(member.id,event.id);
        if(attendance){
          setAttendance(attendance)
          if(attendance.attend){
            setRadioAttend('出席')
          }
        }
        const attendances = await fetchAttendances(event.id)
        setAttendances(attendances);
      }
    }

    fetch()
  },[]) 

  const onRegisterButtonClick = () => {

    const attendance_id = attendance?.id;

    saveAttendance({
      attendance_id,
      attendance_data:{
        member_id: member.id,
        event_id: eventID,
        attend: radioAttend === "出席"
      }
    })

    navigate(`${homeUrl}/`)
  }

 

  const attend_filter = attendances.filter((attendance) => attendance.attend);
  

  const absence_filter = attendances.filter((attendance) => !attendance.attend)

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
      <Button onClick={() => {navigate(`${homeUrl}/`)}}>キャンセル</Button>
      <Button onClick={onRegisterButtonClick}>登録</Button>
      <Text>出席者</Text>
      {attend_filter?.map((attend) => (
        <Text key={attend.id}>{attend.members.username}</Text>
      ))}
      <Text>欠席者</Text>
      {absence_filter?.map((absence) => (
        <Text key={absence.id}>{absence.members.username}</Text>
      ))}
    </>
  );
};

export default UserAttend;

// const ({ id: attendance_id, ...attendance_data})
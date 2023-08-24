import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchAttendance, fetchAttendances, saveAttendance } from '../services/attendService';
import { fetchEvent } from '../services/eventService';
import { useSelector } from 'react-redux';
import { Button, Radio, RadioGroup, HStack, Text, VStack, Box, Divider } from '@chakra-ui/react'


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

 

  // const attend_filter = attendances.filter((attendance) => attendance.attend);
  const attend_Manfilter = attendances.filter((attendance) => attendance.attend && attendance.members.gender === "男性");
  const attend_Womanfilter = attendances.filter((attendance) => attendance.attend && attendance.members.gender === "女性");
  

  const absence_Manfilter = attendances.filter((attendance) => !attendance.attend && attendance.members.gender === "男性")
  const absence_Womanfilter = attendances.filter((attendance) => !attendance.attend && attendance.members.gender === "女性")

  console.log(absence_Manfilter)
  console.log(absence_Womanfilter)

  return (
    <>
      <VStack spacing={8} align="center">
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          出欠登録
        </Text>
        <Text fontSize="lg" fontWeight="bold">{`${year}年${month}月${day}日`}</Text>
        <RadioGroup onChange={setRadioAttend} value={radioAttend}>
          <HStack spacing={9}> 
            <Radio value="出席" size='lg' colorScheme="purple">出席</Radio>
            <Radio value="欠席" size='lg' colorScheme="purple">欠席</Radio>
          </HStack>
        </RadioGroup>
        <HStack spacing={10} mt={4}>
          <Button onClick={() => {navigate(`${homeUrl}/`)}}>キャンセル</Button>
          <Button onClick={onRegisterButtonClick}  bg="purple.200">登録</Button>
        </HStack>
      </VStack>

      <VStack spacing={4} align="center" border="2px solid black" borderRadius="md" maxWidth="80%" mx="auto" mt={12}>
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          出席者
        </Text>
        <HStack spacing={4} align="stretch">
          <VStack spacing={4} align="center" p={4}>
            <Text fontSize="md" textAlign="center">男性</Text>
            {attend_Manfilter?.map((attend) => (
              <Text key={attend.id} fontSize="sm" textAlign="center">
                {attend.members.username}
              </Text>
            ))}
          </VStack>

          <VStack spacing={4} align="center" p={4}>
            <Text fontSize="md" textAlign="center">女性</Text>
            {attend_Womanfilter?.map((attend) => (
              <Text key={attend.id} fontSize="sm" textAlign="center">
                {attend.members.username}
              </Text>
            ))}
          </VStack>
        </HStack>
      </VStack>

      {(absence_Manfilter.length > 0 || absence_Womanfilter.length > 0) && (
        <VStack spacing={4} align="center" border="2px solid black" borderRadius="md" maxWidth="80%" mx="auto" mt={12}>
          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            欠席者
          </Text>
          <HStack spacing={4} align="stretch">
            {absence_Manfilter.length > 0 && (
              <VStack spacing={4} align="center" p={4}>
                <Text fontSize="md" textAlign="center">男性</Text>
                {absence_Manfilter?.map((absence) => (
                  <Text key={absence.id} fontSize="sm" textAlign="center">
                    {absence.members.username}
                  </Text>
                ))}
              </VStack>
            )}
            
            {absence_Womanfilter.length > 0 && (
              <VStack spacing={4} align="center" p={4}>
                <Text fontSize="md" textAlign="center">女性</Text>
                {absence_Womanfilter?.map((absence) => (
                  <Text key={absence.id} fontSize="sm" textAlign="center">
                    {absence.members.username}
                  </Text>
                ))}
              </VStack>
            )}
          </HStack>
        </VStack>
      )}
        {/* <VStack spacing={4} align="center" border="2px solid black" borderRadius="md" maxWidth="80%" mx="auto">
          <Text fontSize="xl" fontWeight="bold" textAlign="center">欠席者</Text>
          {absence_filter?.map((absence) => (
            <Text key={absence.id}>{absence.members.username}</Text>
          ))}
        </VStack> */}
    </>
  );
};

export default UserAttend;

// const ({ id: attendance_id, ...attendance_data})
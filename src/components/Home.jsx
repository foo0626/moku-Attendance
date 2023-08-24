import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSession } from '../Actions';
import { DateTime, Settings } from 'luxon';
import { supabase } from '../services/supabase_api';
import {
  Box,
  Button,
  Text,
  Flex,
} from '@chakra-ui/react'

const homeUrl = process.env.PUBLIC_URL;


function Home() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const member = useSelector((state) => state.member)

  const [admin, setAdmin] = useState(false)

  useEffect( () => {
    const fetch = async () => {
      if(member){
        setAdmin(member.admin)
      }
    }

    fetch()
  },[member])


  
  const handleLogout = async (event) => {
    const { data,error } = await supabase.auth.signOut(
      dispatch(updateSession(null)),
      navigate(`${homeUrl}/login`),
    );
    if (error) {
      console.error(error.message);
    }
  };


  Settings.defaultLocale = "en-US"
  
  const [currentDate, setCurrentDate] = useState(DateTime.now());
  const [events, setEvents] = useState([]);



  // 月の週数を取得する関数
  const getWeeksInMonth = (date) => {
    const firstDayOfMonth = date.startOf('month');
    const startOfWeek = firstDayOfMonth.startOf('week').minus({days: 1});
    const endOfWeek = date.endOf('month').endOf('week').minus({days: 1});;
    return Math.ceil(endOfWeek.diff(startOfWeek, 'weeks').weeks);
  };

  // 前月に移動する関数
  const goToPreviousMonth = () => {
    setCurrentDate(currentDate.minus({ months: 1 }));
  };

  // 次月に移動する関数
  const goToNextMonth = () => {
    setCurrentDate(currentDate.plus({ months: 1 }));
  };

  // カレンダーを生成する関数

  const generateCalendar = () => {
    const weeksInMonth = getWeeksInMonth(currentDate);
    const monthStart = currentDate.startOf('month').startOf('week').minus({days: 1});

    const calendar = [];
    for (let week = 0; week < weeksInMonth; week++) {
      const weekStart = monthStart.plus({ weeks: week });

      const days = [];
      for (let day = 0; day < 7; day++) {
        const currentDay = weekStart.plus({ days: day });
        const currentDateString = currentDay.toFormat('yyyy-LL-dd');
        const isEventsDay = events.includes(currentDateString);
        const bgColor = isEventsDay ? 'purple.300': 'lightgray'
        const isCurrentMonth = currentDay.hasSame(currentDate, 'month');
        const isPreviousMonth = !isCurrentMonth && currentDay < currentDate;
        const isNextMonth = !isCurrentMonth && currentDay > currentDate.endOf('month');
        const additionalStyle = isPreviousMonth || isNextMonth ? { opacity: 0.4 } : {};

        days.push(
          <Box
          bg={bgColor}
          key={day}
          data-day={currentDateString}
          data-iseventday={isEventsDay}
          onClick={handleDateSelection}
          cursor="pointer"
          p={2}
          textAlign="center"
          border="1px solid black"
          style={additionalStyle}
          _hover={{ bg: isCurrentMonth ? 'gray.200' : 'transparent' }}
        >
             {isCurrentMonth ? currentDay.day : currentDay.day}
          </Box>
        );
      }

      calendar.push(
        <Flex
          key={week}
          display="grid"
          gridTemplateColumns="repeat(7, 1fr)"
          gridGap="0px"
          justifyContent="center"
          alignItems="center"
        >
          {days}
        </Flex>
      );
    }
    return calendar;
  }; 

  const fetchEvents = async (date) => {
    const startOfMonth = date.startOf('month').toISO();
    const endOfMonth = date.endOf('month').toISO();

    let { data: rows, error } = await supabase
      .from('events')
      .select('*')
      .gte('date', startOfMonth)
      .lte('date', endOfMonth)

      if(error) {
        console.error('Error: ', error)
      } else {
        const events = rows.map( (event) => event.date );
        setEvents(events);
      }
    }
    
  useEffect( ()=>{
    fetchEvents(currentDate);
  },[currentDate])


  // 日付選択時の処理
  const handleDateSelection = (e) => {
    const isEventsDay = e.currentTarget.getAttribute('data-iseventday') === 'true'
    const dateString = e.currentTarget.getAttribute('data-day')
    const selectedDate = DateTime.fromISO(dateString)
    const year = selectedDate.year;
    const month = selectedDate.month;
    const day = selectedDate.day;
    if (isEventsDay) {
      navigate(`${homeUrl}/userattend?year=${year}&month=${month}&day=${day}`);
    }
  };

  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <Box p={4} maxW="500px" m="auto">
      {!admin && <Button onClick={handleLogout}>ログアウト</Button>}
      {admin && (
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Button onClick={() => navigate(`${homeUrl}/practicecalender`)}  bg="purple.200" >
            練習日登録
          </Button>
          <Button onClick={handleLogout}>
            ログアウト
          </Button>
        </Flex>
      )}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={4} mt={10}>
        <Button onClick={goToPreviousMonth} variant="outline" borderColor="white">
          前月
        </Button>
        <Text fontSize="xl" fontWeight="bold">
          {currentDate.setLocale('ja').toFormat('yyyy年M月')}
        </Text>
        <Button onClick={goToNextMonth} variant="outline" borderColor="white">
          次月
        </Button>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        {weekdays.map((weekday, index) => (
          <Box key={index} flex="1" textAlign="center" fontWeight="bold" px={0} m={0}>
            {weekday}
          </Box>
        ))}
      </Box>
      <Box border="1px solid lightgray" overflow="hidden">
        {generateCalendar()}
      </Box>
    </Box>
  );
}

export default Home





// // src/components/Home.js
// import React, { useState, useEffect } from 'react';
// import { DateTime, Settings } from 'luxon';
// import { useNavigate } from 'react-router-dom';
// import '../styles.css';
// import { supabase } from '../services/supabase_api';
// import { Box } from '@chakra-ui/react';

// const homeUrl = process.env.PUBLIC_URL;


// function Home() {

//   const navigate = useNavigate();

  
//   const [currentDate, setCurrentDate] = useState(DateTime.now());
//   const [events, setEvents] = useState([]);

//   Settings.defaultLocale = "en-US"


//   // 月の週数を取得する関数
//   const getWeeksInMonth = (date) => {
//     const firstDayOfMonth = date.startOf('month');
//     const startOfWeek = firstDayOfMonth.startOf('week').minus({days: 1});
//     const endOfWeek = date.endOf('month').endOf('week').minus({days: 1});;
//     return Math.ceil(endOfWeek.diff(startOfWeek, 'weeks').weeks);
//   };

//   // 前月に移動する関数
//   const goToPreviousMonth = () => {
//     setCurrentDate(currentDate.minus({ months: 1 }));
//   };

//   // 次月に移動する関数
//   const goToNextMonth = () => {
//     setCurrentDate(currentDate.plus({ months: 1 }));
//   };

//   // カレンダーを生成する関数

//   const generateCalendar = () => {
//     const weeksInMonth = getWeeksInMonth(currentDate);
//     const monthStart = currentDate.startOf('month').startOf('week').minus({days: 1});

//     const calendar = [];
//     for (let week = 0; week < weeksInMonth; week++) {
//       const weekStart = monthStart.plus({ weeks: week });

//       const days = [];
//       for (let day = 0; day < 7; day++) {
//         const currentDay = weekStart.plus({ days: day });
//         const currentDateString = currentDay.toFormat('yyyy-LL-dd');
//         const isEventsDay = events.includes(currentDateString);
//         const bgColor = isEventsDay ? 'tomato': 'lightgray'
//         const isCurrentMonth = currentDay.hasSame(currentDate, 'month');

//         days.push(
//           <Box bg={bgColor}
//             key={day}
//             data-day={currentDateString}
//             data-iseventday={isEventsDay}
//             className={`day ${isCurrentMonth ? 'currentMonth' : ''}`}
//             onClick={handleDateSelection}
//           >
//             {isCurrentMonth ? currentDay.day : ''}
//           </Box>
//         );
//       }

//       calendar.push(
//         <div key={week} className="week">
//           {days}
//         </div>
//       );
//     }

//     return calendar;
//   }; 

//   const fetchEvents = async (date) => {
//     const startOfMonth = date.startOf('month').toISO();
//     const endOfMonth = date.endOf('month').toISO();

//     let { data: rows, error } = await supabase
//       .from('events')
//       .select('*')
//       .gte('date', startOfMonth)
//       .lte('date', endOfMonth)

//       if(error) {
//         console.error('Error: ', error)
//       } else {
//         const events = rows.map( (event) => event.date );
//         setEvents(events);
//       }
//     }
    
//   useEffect( ()=>{
//     fetchEvents(currentDate);
//   },[currentDate])


//   // 日付選択時の処理
//   const handleDateSelection = (e) => {
//     const isEventsDay = e.currentTarget.getAttribute('data-iseventday') === 'true'
//     const dateString = e.currentTarget.getAttribute('data-day')
//     const selectedDate = DateTime.fromISO(dateString)
//     const year = selectedDate.year;
//     const month = selectedDate.month;
//     const day = selectedDate.day;
//     if (isEventsDay) {
//       navigate(`${homeUrl}/userattend?year=${year}&month=${month}&day=${day}`);
//     }
//   };

//   const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

//   return (
//     <div className="calendar">
//       <div className="header">
//         <button onClick={goToPreviousMonth}>前月</button>
//         <h2>{currentDate.setLocale('ja').toFormat('yyyy年M月')}</h2>
//         <button onClick={goToNextMonth}>次月</button>
//       </div>
//       <div className="days">
//         {weekdays.map((weekday, index) => (
//           <Box key={index} className='day'>
//             {weekday}
//           </Box>
//         ))}
//       </div>
//       {generateCalendar()}
//     </div>
//   );
// }

// export default Home;
// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { DateTime, Settings } from 'luxon';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import { supabase } from '../services/supabase_api';
import { Box } from '@chakra-ui/react';

const homeUrl = process.env.PUBLIC_URL;


function Home() {

  const navigate = useNavigate();

  
  const [currentDate, setCurrentDate] = useState(DateTime.now());
  const [events, setEvents] = useState([]);

  Settings.defaultLocale = "en-US"


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
        const bgColor = isEventsDay ? 'tomato': 'lightgray'
        const isCurrentMonth = currentDay.hasSame(currentDate, 'month');

        days.push(
          <Box bg={bgColor}
            key={day}
            data-day={currentDateString}
            data-iseventday={isEventsDay}
            className={`day ${isCurrentMonth ? 'currentMonth' : ''}`}
            onClick={handleDateSelection}
          >
            {isCurrentMonth ? currentDay.day : ''}
          </Box>
        );
      }

      calendar.push(
        <div key={week} className="week">
          {days}
        </div>
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
    <div className="calendar">
      <div className="header">
        <button onClick={goToPreviousMonth}>前月</button>
        <h2>{currentDate.setLocale('ja').toFormat('yyyy年M月')}</h2>
        <button onClick={goToNextMonth}>次月</button>
      </div>
      <div className="days">
        {weekdays.map((weekday, index) => (
          <Box key={index} className='day'>
            {weekday}
          </Box>
        ))}
      </div>
      {generateCalendar()}
    </div>
  );
}

export default Home;
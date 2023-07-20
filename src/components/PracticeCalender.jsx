// src/components/Home.js
import React, { useState } from 'react';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const homeUrl = process.env.PUBLIC_URL;


function PracticeCalender() {

  const navigate = useNavigate();

  
  const [currentDate, setCurrentDate] = useState(DateTime.now());

  // 月の週数を取得する関数
  const getWeeksInMonth = (date) => {
    const firstDayOfMonth = date.startOf('month');
    const startOfWeek = firstDayOfMonth.startOf('week');
    const endOfWeek = date.endOf('month').endOf('week');
    return Math.ceil(endOfWeek.diff(startOfWeek, 'weeks').weeks) + 1;
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
    const monthStart = currentDate.startOf('month').startOf('week');

    const calendar = [];
    for (let week = 0; week < weeksInMonth; week++) {
      const weekStart = monthStart.plus({ weeks: week });

      const days = [];
      for (let day = 0; day < 7; day++) {
        const currentDay = weekStart.plus({ days: day });
        const isCurrentMonth = currentDay.hasSame(currentDate, 'month');

        days.push(
          <div
            key={day}
            className={`day ${isCurrentMonth ? 'currentMonth' : ''}`}
            onClick={() => handleDateSelection(currentDay)}
          >
            {isCurrentMonth ? currentDay.day : ''}
          </div>
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

  // 日付選択時の処理
  const handleDateSelection = (selectedDate) => {
    const year = selectedDate.year;
    const month = selectedDate.month;
    const day = selectedDate.day;
    navigate(`${homeUrl}/practicedetail?year=${year}&month=${month}&day=${day}`);
  };

  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <>
      <h2>練習日登録</h2>
      <div className="calendar">
        <div className="header">
          <button onClick={goToPreviousMonth}>前月</button>
          <h2>{currentDate.setLocale('ja').toFormat('yyyy年M月')}</h2>
          <button onClick={goToNextMonth}>次月</button>
        </div>
        <div className="days">
          {weekdays.map((weekday, index) => (
            <div key={index} className="day">
              {weekday}
            </div>
          ))}
        </div>
        {generateCalendar()}
      </div>
    </>
  );
}

export default PracticeCalender;
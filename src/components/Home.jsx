// src/components/Home.js
import React, { useState } from 'react';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function Home() {
  const [currentDate, setCurrentDate] = useState(DateTime.now());
  const navigate = useNavigate();

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
    navigate(`/attend?year=${year}&month=${month}&day=${day}`);
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
          <div key={index} className="day">
            {weekday}
          </div>
        ))}
      </div>
      {generateCalendar()}
    </div>
  );
}

export default Home;

// import React, { useState } from 'react';
// import { DateTime } from 'luxon';
// import { useNavigate } from 'react-router-dom';
// import '../styles.css';

// function Home() {
//   const [currentDate, setCurrentDate] = useState(DateTime.now());

//   // 月の始まりの曜日によって表示する週の数を決定する
//   const getWeeksInMonth = (date) => {
//     const firstDayOfMonth = date.startOf('month');
//     const startOfWeek = firstDayOfMonth.startOf('week');
//     const endOfWeek = date.endOf('month').endOf('week');

//     console.log(firstDayOfMonth);
//     console.log(startOfWeek);
//     console.log(endOfWeek);
//     console.log(endOfWeek.diff(startOfWeek, 'weeks').weeks);
//     return Math.ceil(endOfWeek.diff(startOfWeek, 'weeks').weeks) + 1;
//   };

//   // 前月に切り替えるボタンのハンドラ
//   const goToPreviousMonth = () => {
//     setCurrentDate(currentDate.minus({ months: 1 }));
//   };

//   // 次月に切り替えるボタンのハンドラ
//   const goToNextMonth = () => {
//     setCurrentDate(currentDate.plus({ months: 1 }));
//   };

//   // カレンダーの日付を生成する
//   const generateCalendar = () => {
//     const weeksInMonth = getWeeksInMonth(currentDate);
//     const monthStart = currentDate.startOf('month').startOf('week');

//     const calendar = [];
//     for (let week = 0; week < weeksInMonth; week++) {
//       const weekStart = monthStart.plus({ weeks: week });

//       const days = [];
//       for (let day = 0; day < 7; day++) {
//         const currentDay = weekStart.plus({ days: day });
//         const isCurrentMonth = currentDay.hasSame(currentDate, 'month');

//         days.push(
//           <div key={day} className={`day ${isCurrentMonth ? 'currentMonth' : ''}`}>
//             {isCurrentMonth ? currentDay.day : ''}
//           </div>
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

//   return (
//     <div className="calendar">
//       <div className="header">
//         <button onClick={goToPreviousMonth}>前月</button>
//         <h2>{currentDate.setLocale('ja').toFormat('yyyy年M月')}</h2>
//         <button onClick={goToNextMonth}>次月</button>
//       </div>
//       <div className="days">
//         <div className="day">日</div>
//         <div className="day">月</div>
//         <div className="day">火</div>
//         <div className="day">水</div>
//         <div className="day">木</div>
//         <div className="day">金</div>
//         <div className="day">土</div>
//       </div>
//       {generateCalendar()}
//     </div>
//   );
// }

// export default Home;

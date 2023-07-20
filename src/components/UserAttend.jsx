import React from 'react';
import { useSearchParams } from 'react-router-dom';

const UserAttend = () => {
  const [searchParams] = useSearchParams();
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const day = searchParams.get('day');

  // const updateAttendance = () => {

  // }

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

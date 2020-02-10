import React, { useState } from 'react';
import * as dateFns from 'date-fns';

const Calendar = (props: any) => {
  const today = new Date(Date.now());

  const [currentMonth, setMonth] = useState(dateFns.getMonth(today) + 1);
  const [selectedDate, setSelectedDate] = useState(dateFns.getDate(today));

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';

    return (
      <div className="header">
        <button onClick={prevMonth}> Prev </button>
        <span>{dateFns.format(today, dateFormat)}</span>
        <button onClick={prevMonth}> Next </button>
      </div>
    );
  };
  const renderDays = () => {};
  const renderCells = () => {};

  const onDateClick = (day: number) => {};
  const nextMonth = () => {};
  const prevMonth = () => {};

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;

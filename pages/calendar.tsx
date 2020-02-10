import React, { useState } from 'react';
import * as dateFns from 'date-fns';

const Calendar = (props: any) => {
  const today = new Date(Date.now());

  const [current, setCurrent] = useState(today);
  const [selectedDate, setSelectedDate] = useState(dateFns.getDate(today));

  const renderHeader = () => {
    const dateFormat = 'MMMM YYYY';

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <button onClick={prevMonth}> Prev </button>
        </div>

        <div className="col col-center">
          <span>{dateFns.format(current, dateFormat)}</span>
        </div>

        <div className="col col-end" onClick={nextMonth}>
          <button onClick={prevMonth}> Next </button>
        </div>
      </div>
    );
  };
  const renderDays = () => {
    const dateFormat = 'dddd';
    const days = [];

    let startDate = dateFns.startOfWeek(current);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = dateFns.startOfMonth(current);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = 'D';
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? 'disabled'
                : dateFns.isSameDay(day, selectedDate)
                ? 'selected'
                : ''
            }`}
            key={day.getDate()}
            onClick={() => onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day.getDate()}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="body">{rows}</div>;
  };

  const onDateClick = (day: any) => {
    setSelectedDate(day);
  };

  const nextMonth = () => {
    const newMonth = dateFns.addMonths(current, 1);
    setCurrent(newMonth);
  };

  const prevMonth = () => {
    const newMonth = dateFns.subMonths(current, 1);
    setCurrent(newMonth);
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;

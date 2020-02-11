import React, { useState } from 'react';
import * as dateFns from 'date-fns';

const Calendar = (props: any) => {
  const today = new Date(Date.now());

  const [current, setCurrent] = useState(today);
  const [checkin, setCheckin] = useState(dateFns.getDate(today));
  const [checkout, setCheckout] = useState(dateFns.getDate(today));
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';

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
    const dateFormat = 'EEEEE';
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

    const dummyTrips = [
      {
        id: 222,
        dateFrom: new Date(2020, 2, 14),
        dateTo: new Date(2020, 2, 20),
      },
      {
        id: 223,
        dateFrom: new Date(2020, 2, 22),
        dateTo: new Date(2020, 2, 28),
      },
    ];

    const allIntervals: any = {};

    dummyTrips.forEach((trip) => {
      let interval = {
        start: trip.dateFrom,
        end: trip.dateTo,
      };
      let eachDay = dateFns.eachDayOfInterval(interval);

      allIntervals[trip.id] = eachDay;
    });

    console.log('allIntervals:', allIntervals);

    // dateFns.eachDayOfInterval(
    //   dummyTrips[0].dateFrom,
    //   dummyTrips[0].dateTo
    // );

    // for each trip
    // in between start and end
    // render the cells with a grey bg #1

    const dateFormat = 'd';
    const rows = [];
    let days: any = {};
    let day = startDate;
    let formattedDate = '';
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);

        const cloneDay = day;

        days[dateFns.format(day, 'yyyy MM d')] = (
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? 'disabled'
                : dateFns.isSameDay(day, checkin)
                ? 'checkin'
                : dateFns.isSameDay(day, checkout)
                ? 'checkout'
                : dateFns.isAfter(day, checkin) &&
                  dateFns.isBefore(day, checkout)
                ? 'between'
                : ''
            }`}
            key={dateFns.format(day, 'yyyy MM d')}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );

        day = dateFns.addDays(day, 1);
      }

      console.log(days);
      // days.forEach(day => {
      //   if(day.key === )
      // })
      rows.push(
        <div className="row" key={day.getDate()}>
          {Object.values(days)}
        </div>
      );
      days = {};
    }

    return <div className="body">{rows}</div>;
  };

  const onDateClick = (day: any) => {
    if (!isCheckedIn) {
      setCheckin(day);
      setIsCheckedIn(true);
    } else if (isCheckedIn && dateFns.isAfter(day, checkin)) {
      setCheckout(day);
    } else if (isCheckedIn && dateFns.isBefore(day, checkin)) {
      setCheckin(day);
    }
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

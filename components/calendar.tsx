import React, { useState } from 'react';
import * as dateFns from 'date-fns';

const Calendar = (props: any) => {
  const today = new Date(Date.now());

  const { checkin, setCheckin, checkout, setCheckout } = props;

  const [current, setCurrent] = useState(today);
  // const [checkin, setCheckin] = useState(dateFns.getDate(today));
  // const [checkout, setCheckout] = useState(dateFns.getDate(today));
  const [chooseCheckin, setChooseCheckin] = useState(true);

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

    const dummyTrips: any[] = [
      // {
      //   id: 222,
      //   dateFrom: new Date(2020, 1, 16),
      //   dateTo: new Date(2020, 1, 21),
      // },
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

    const dateFormat = 'd';
    const rows = [];
    let days: any = {};
    let day = startDate;
    let formattedDate = '';
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);

        const cloneDay = day;

        let className = !dateFns.isSameMonth(day, monthStart)
          ? 'disabled'
          : dateFns.isSameDay(day, checkin)
          ? 'checkin'
          : dateFns.isSameDay(day, checkout)
          ? 'checkout'
          : dateFns.isAfter(day, checkin) && dateFns.isBefore(day, checkout)
          ? 'between'
          : '';

        for (let i = 0; i < dummyTrips.length; i++) {
          const interval = {
            start: dummyTrips[i].dateFrom,
            end: dummyTrips[i].dateTo,
          };

          if (dateFns.isWithinInterval(day, interval)) {
            console.log(`${day} is in ${i}`);
            className += ` trip _${i}`;
          }
        }

        days[dateFns.format(day, 'yyyy MM d')] = (
          <div
            id={dateFns.format(day, 'yyyy MM d')}
            className={`col cell ${className}`}
            key={dateFns.format(day, 'yyyy MM d')}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );

        day = dateFns.addDays(day, 1);
      }

      // if (days['2020 01 26']) {
      //   const elem = document.getElementById('2020 01 26');
      //   elem?.classList.add('checkin');
      //   console.log(elem);
      // }

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
    if (chooseCheckin) {
      setCheckin(day);
      if (checkout !== 0 && dateFns.isAfter(day, checkout)) setCheckout(0);
      else setChooseCheckin(false);
    } else {
      setCheckout(day);
      if (checkin !== 0 && dateFns.isBefore(day, checkin)) {
        setCheckin(day);
        setCheckout(0);
      }
      setChooseCheckin(true);
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
      <button
        onClick={() => {
          setCheckin(null);
          setCheckout(null);
          setChooseCheckin(true);
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default Calendar;

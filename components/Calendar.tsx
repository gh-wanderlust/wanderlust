import React, { useState } from 'react';
import * as dateFns from 'date-fns';
import styled from 'styled-components';

const Calendar = (props: any) => {
  const today = new Date(Date.now());

  const {
    trips,
    tripColors,
    checkin,
    setCheckin,
    checkout,
    setCheckout,
  } = props;

  const [current, setCurrent] = useState(today);
  const [chooseCheckin, setChooseCheckin] = useState(true);

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <MonthButton onClick={prevMonth}> Prev </MonthButton>
        </div>

        <div className="col col-center">
          <span>{dateFns.format(current, dateFormat)}</span>
        </div>

        <div className="col col-end" onClick={nextMonth}>
          <MonthButton onClick={nextMonth}> Next </MonthButton>
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

    const tripDays: any = {};
    trips.forEach((trip: any) => {
      const dateFrom = new Date(trip.dateFrom);
      const dateTo = new Date(trip.dateTo);
      let interval = { start: dateFrom, end: dateTo };
      let eachDay = dateFns.eachDayOfInterval(interval);

      eachDay.forEach((day) => {
        const date = dateFns.format(day, 'yyyy-MM-dd');

        if (!tripDays[date]) tripDays[date] = [];
        const node = dateFns.isSameDay(day, dateFrom)
          ? { id: trip.id, pos: 'head' }
          : dateFns.isSameDay(day, dateTo)
          ? { id: trip.id, pos: 'tail' }
          : { id: trip.id, pos: 'body' };
        tripDays[date].push(node);
      });
    });

    const dateFormat = 'd';
    const rows = [];
    let days: any = {};
    let day = startDate;
    let formattedDate = '';
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);

        let className =
          day < today || !dateFns.isSameMonth(day, monthStart)
            ? 'disabled'
            : dateFns.isSameDay(day, checkin) && checkout === 0
            ? 'checkin no-checkout'
            : dateFns.isSameDay(day, checkin)
            ? 'checkin'
            : dateFns.isSameDay(day, checkout)
            ? 'checkout'
            : dateFns.isAfter(day, checkin) && dateFns.isBefore(day, checkout)
            ? 'between'
            : '';

        days[dateFns.format(day, 'yyyy MM d')] = (
          <Cell
            key={formattedDate}
            day={day}
            className={className}
            formattedDate={formattedDate}
            tripDays={tripDays[dateFns.format(day, 'yyyy-MM-dd')]}
          />
        );

        day = dateFns.addDays(day, 1);
      }

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
      setChooseCheckin(false);
    } else {
      if (!dateFns.isSameDay(day, checkin)) {
        setCheckout(day);
        setChooseCheckin(true);
      }
      if (checkin !== 0 && dateFns.isBefore(day, checkin)) {
        setCheckin(day);
        setCheckout(0);
        setChooseCheckin(false);
      }
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

  const Cell = (props: any) => {
    const { day, className, formattedDate, tripDays } = props;

    let children = '';
    if (tripDays) {
      children = tripDays.map((trip: any) => {
        const { id, pos } = trip;
        let style: any = {};

        if (pos === 'head') style.borderRadius = '50% 0 0 50%';
        else if (pos === 'tail') style.borderRadius = '0 50% 50% 0';

        style.backgroundColor = tripColors[id];

        return <div key={id} className={`trip ${id}`} style={style} />;
      });
    }

    return (
      <div
        id={dateFns.format(day, 'yyyy MM d')}
        className={`col cell ${className}`}
        key={dateFns.format(day, 'yyyy MM d')}
        onClick={() => onDateClick(day)}
      >
        {children}
        <span className="number">{formattedDate}</span>
      </div>
    );
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {/* <button
        onClick={() => {
          setCheckin(null);
          setCheckout(null);
          setChooseCheckin(true);
        }}
      >
        Clear
      </button> */}
    </div>
  );
};

export default Calendar;

const MonthButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  padding: 1em;
  font-size: 0.7em;
  text-transform: uppercase;
  color: var(--accent-dark);
  transition: all 0.2s ease;

  :hover {
    color: var(--accent-light);
  }
`;

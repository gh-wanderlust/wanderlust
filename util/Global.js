import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`

  * {
    --black: #22222;
    --light-gray: #F2F2F2;
    --dark-gray: #C0C0C0;
    --accent-dark: #23565C;
    --accent-light: #3E8A92;
  }

  body {
    font-family: 'Work Sans';
    color: #222222;
  }


  /* GRID */

.row {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.row-middle {
  align-items: center;
}

.col {
  flex-grow: 1;
  flex-basis: 0;
  max-width: 100%;
}

.col-start {
  justify-content: flex-start;
  text-align: left;
}

.col-center {
  justify-content: center;
  text-align: center;
}

.col-end {
  justify-content: flex-end;
  text-align: right;
}

/* Calendar */

.calendar {
  display: block;
  position: relative;
  width: 80%;
  background: var(--neutral-color);
  border: 1px solid var(--border-color);
}

.calendar .header {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 115%;
  padding: 1.5em 0;
  border-bottom: 1px solid var(--border-color);
}

.calendar .header .icon {
  cursor: pointer;
  transition: 0.15s ease-out;
}

.calendar .header .icon:hover {
  transform: scale(1.75);
  transition: 0.25s ease-out;
  color: var(--main-color);
}

.calendar .header .icon:first-of-type {
  margin-left: 1em;
}

.calendar .header .icon:last-of-type {
  margin-right: 1em;
}

.calendar .days {
  text-transform: uppercase;
  font-weight: 400;
  color: var(--dark-gray);
  font-size: 1.2rem;
  padding: 0.75em 0;
}

.calendar .body .cell {
  position:relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5em;
  border-right: 1px solid var(--border-color);
  overflow: hidden;
  cursor: pointer;
  transition: 0.25s ease-out;
}


.calendar .body .cell .number {
  font-size: 1.5rem;
  line-height: 1;
  font-weight: 400;
}

.calendar .body .disabled {
  color: var(--light-gray);
  text-decoration: line-through;
  pointer-events: none;
}


.calendar .body .col {
  flex-grow: 0;
  flex-basis: calc(100% / 7);
  width: calc(100% / 7);
}


.checkin {
  position: relative;
  background-color: var(--accent-light);
  border-radius: 50% 0 0 50%;
  color: white;
}

.checkin.no-checkout {
  border-radius: 50%;
}

.checkin::before {
  position: absolute;
  top: 0;
  left: 0;
  content: '';
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--accent-dark);
  mix-blend-mode: screen;
}

.checkout {
  position: relative;
  background-color: var(--accent-light);
  border-radius: 0 50% 50% 0;
  color: white;
}

.checkout::after {
  position: absolute;
  top: 0;
  left: 0;
  content: '';
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--accent-dark);
  mix-blend-mode: screen;
}

.between {
  background-color: var(--accent-light);
  color:white;
}

.trip {
  position: absolute;
  width: 100%;
  height: 100%;
  mix-blend-mode: overlay;
  opacity: .3;
  box-sizing: border-box;
}


`;

export default Global;

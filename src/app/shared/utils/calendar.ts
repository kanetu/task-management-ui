import { SYSTEM_DATE_FORMAT } from 'src/app/constants/date-format';

const rangeDatesOfCalendar = (moment: any, date: string) => {
  const currentMonth = moment(date).startOf('month');
  const nextMonth = moment(date).add(1, 'month').startOf('month');
  const prevMonth = moment(date).subtract(1, 'month').startOf('month');

  const numberOfCalendar = 42;
  const daysOfCurrentMonth = currentMonth.daysInMonth();
  const daysOfPrevMonth = currentMonth.days();
  const daysOfNextMonth =
    numberOfCalendar - daysOfCurrentMonth - daysOfPrevMonth;

  let firstDay;
  let lastDay;

  if (daysOfPrevMonth > 0) {
    firstDay = prevMonth
      .date(prevMonth.daysInMonth() - daysOfPrevMonth + 1)
      .format(SYSTEM_DATE_FORMAT);
  } else {
    firstDay = currentMonth.date(1).format(SYSTEM_DATE_FORMAT);
  }
  if (daysOfNextMonth > 0) {
    lastDay = nextMonth.date(daysOfNextMonth).format(SYSTEM_DATE_FORMAT);
  }

  return [firstDay, lastDay];
};

export default rangeDatesOfCalendar;

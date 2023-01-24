import dayjs from 'dayjs';

const TIME_FORMAT = 'HH mm';
const DATE_FORMAT = 'MMM DD';

function humanizeEventTime (dueDate) {
  return dueDate ? dayjs(dueDate).format(TIME_FORMAT) : '';
}

function humanizeEventDate (dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

function isFutureEvent (dateFrom) {
  return dateFrom && (dayjs().isSame(dateFrom, 'D') || dayjs().isBefore(dateFrom, 'D'));
}

export {humanizeEventTime, humanizeEventDate, isFutureEvent};

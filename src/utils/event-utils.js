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

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

function sortEventDate(eventA, eventB) {
  const weight = getWeightForNullDate(eventA.dateFrom, eventB.dateFrom);

  return weight ?? dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));
}

function sortEventPrice(eventA, eventB) {
  const weight = getWeightForNullDate(eventA.dateFrom, eventB.dateFrom);

  return weight ?? eventB.basePrice - eventA.basePrice;
}

export {humanizeEventTime, humanizeEventDate, isFutureEvent, sortEventDate, sortEventPrice};

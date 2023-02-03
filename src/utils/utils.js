import dayjs from 'dayjs';

const EDIT_FORM_DATE_FORMAT = 'DD/MM/YY HH:mm';
function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger (min, max) {
  if (min < 0 || max < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function humanizeFormDate (dueDate) {
  return dueDate ? dayjs(dueDate).format(EDIT_FORM_DATE_FORMAT) : '';
}


export {getRandomArrayElement, getRandomInteger, humanizeFormDate};

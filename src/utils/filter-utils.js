import { FilterType } from '../const.js';
import { isFutureEvent } from './event-utils.js';

const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isFutureEvent(event.dateFrom)),
};

export { filter };

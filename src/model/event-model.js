import { getRandomEvent } from '../mock/event-mock.js';

const EVENT_COUNT = 3;

export default class EventsModel {
  #events = Array.from({length:EVENT_COUNT}, getRandomEvent);

  get events () {
    return this.#events;
  }
}

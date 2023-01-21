import { getRandomEvent } from '../mock/event.js';

const EVENT_COUNT = 3;

export default class EventsModel {
  #events = Array.from({length:EVENT_COUNT}, getRandomEvent);

  get events () {
    return this.#events;
  }
}

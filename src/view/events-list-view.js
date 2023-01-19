import {createElement} from '../render.js';

function createTemplateEventsList() {
  return '<ul class="trip-events__list"></ul>';
}

export default class EventsListView {
  #element = null;

  get template() {
    return createTemplateEventsList();
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  remoweElement() {
    this.#element = null;
  }
}

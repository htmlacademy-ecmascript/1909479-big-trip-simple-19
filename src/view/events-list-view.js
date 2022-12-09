import {createElement} from '../render.js';

function createTemplateEventsList() {
  return '<ul class="trip-events__list"></ul>';
}

export default class EventsListView {
  getTemplate() {
    return createTemplateEventsList();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  remoweElement() {
    this.element = null;
  }
}

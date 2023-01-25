import EventsListView from '../view/events-list-view.js';
import EventPresenter from './event-presenter.js';
import SortingView from '../view/sorting-view.js';
import NoEventView from '../view/no-event-view.js';
import {render} from '../framework/render.js';

export default class BoardPresenter {
  #boardContainer = null;
  #eventModel = null;
  #boardEvents = [];
  #boardComponent = new EventsListView();
  #sortComponent = new SortingView();
  #noEventView = new NoEventView();
  #eventsPresenter = new Map();

  constructor({boardContainer, eventModel}) {
    this.#boardContainer = boardContainer;
    this.#eventModel = eventModel;
  }

  init() {
    this.#boardEvents = [...this.#eventModel.events];
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#eventsPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderSort() {
    render(this.#sortComponent, this.#boardContainer);
  }

  #renderNoEvents () {
    render(this.#noEventView, this.#boardContainer);
  }

  #renderEvent(event) {

    const eventPresenter = new EventPresenter({
      eventListContainer: this.#boardComponent.element,
      onModeChange: this.#handleModeChange,
    });
    eventPresenter.init(event);
    this.#eventsPresenter.set(event.id, eventPresenter);
  }

  #renderEvents(from, to) {
    this.#boardEvents
      .slice(from, to)
      .forEach((event) => this.#renderEvent(event));
  }

  #renderBoard() {
    if (this.#boardEvents.length === 0) {
      this.#renderNoEvents();
    } else {
      this.#renderSort();
      render(this.#boardComponent, this.#boardContainer);
      this.#renderEvents();
    }
  }
}

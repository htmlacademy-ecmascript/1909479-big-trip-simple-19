import EventsListView from '../view/events-list-view.js';
import EventPresenter from './event-presenter.js';
import SortingView from '../view/sorting-view.js';
import NoEventView from '../view/no-event-view.js';
import {render} from '../framework/render.js';
import { SortType } from '../const.js';
import { sortEventDate, sortEventPrice } from '../utils/event-utils.js';

export default class BoardPresenter {
  #boardContainer = null;
  #eventModel = null;
  #boardEvents = [];
  #boardComponent = new EventsListView();
  #sortComponent = null;
  #noEventView = new NoEventView();
  #eventsPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #soursetBoardEvents = [];

  constructor({boardContainer, eventModel}) {
    this.#boardContainer = boardContainer;
    this.#eventModel = eventModel;
  }

  init() {
    this.#boardEvents = [...this.#eventModel.events];
    this.#soursetBoardEvents = [...this.#eventModel.events];
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#eventsPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEventList();
    this.#renderEvents();
  };

  #sortEvents(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this.#boardEvents.sort(sortEventDate);
        break;
      case SortType.PRICE:
        this.#boardEvents.sort(sortEventPrice);
        break;
      default:
        this.#boardEvents = [...this.#soursetBoardEvents];
    }

    this.#currentSortType = sortType;
  }

  #renderSort() {
    this.#sortComponent = new SortingView({onSortTypeChange: this.#handleSortTypeChange});
    render(this.#sortComponent, this.#boardContainer);
  }

  #renderNoEvents () {
    render(this.#noEventView, this.#boardContainer);
  }

  #clearEventList() {
    this.#eventsPresenter.forEach((presenter) => presenter.destroy());
    this.#eventsPresenter.clear();
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

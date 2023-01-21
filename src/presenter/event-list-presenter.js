import EventsListView from '../view/events-list-view.js';
import EditEventView from '../view/edit-form-view.js';
import EventsItemView from '../view/events-item-view.js';
import SortingView from '../view/sorting-view.js';
import NoEventView from '../view/no-event-view.js';
import { render } from '../render.js';

export default class EventListPresenter {
  #boardContainer = null;
  #eventModel = null;
  #boardEvents = [];
  #boardComponent = new EventsListView();

  constructor({boardContainer, eventModel}) {
    this.#boardContainer = boardContainer;
    this.#eventModel = eventModel;
  }

  init() {
    this.#boardEvents = [...this.#eventModel.events];

    if (this.#boardEvents.length === 0) {
      render(new NoEventView(), this.#boardContainer);
    } else {
      render(new SortingView(), this.#boardContainer);
      render(this.#boardComponent, this.#boardContainer);
      for (let i = 0; i < this.#boardEvents.length; i++) {
        this.#renderEvent(this.#boardEvents[i]);
      }
    }
  }

  #renderEvent(event) {
    const eventComponent = new EventsItemView({event});
    const editEventComponent = new EditEventView(event);

    const replaceCardToForm = () => {
      this.#boardComponent.element.replaceChild(editEventComponent.element, eventComponent.element);
    };

    const replaceFormToCard = () => {
      this.#boardComponent.element.replaceChild(eventComponent.element, editEventComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    eventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceCardToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    editEventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    editEventComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(eventComponent, this.#boardComponent.element);
  }
}

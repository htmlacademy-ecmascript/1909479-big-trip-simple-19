import EventsListView from '../view/events-list-view.js';
import EditEventView from '../view/edit-form-view.js';
import EventsItemView from '../view/events-item-view.js';
import SortingView from '../view/sorting-view.js';
import NoEventView from '../view/no-event-view.js';
import {render} from '../framework/render.js';

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

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const eventComponent = new EventsItemView({
      event,
      onEditClick: () => {
        replaceCardToForm.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const eventEditComponent = new EditEventView({
      event,
      onFormSubmit: () => {
        replaceFormToCard.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormClick: () => {
        replaceFormToCard.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      this.#boardComponent.element.replaceChild(eventEditComponent.element, eventComponent.element);
    }

    function replaceFormToCard() {
      this.#boardComponent.element.replaceChild(eventComponent.element, eventEditComponent.element);
    }

    render(eventComponent, this.#boardComponent.element);
  }
}

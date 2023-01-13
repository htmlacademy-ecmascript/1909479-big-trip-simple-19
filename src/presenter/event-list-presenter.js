import EventsListView from '../view/events-list-view.js';
import AddNewEventView from '../view/add-form-view.js';
import EditEventView from '../view/edit-form-view.js';
import EventsItemView from '../view/events-item-view.js';
import SortingView from '../view/sorting-view.js';
import { render } from '../render.js';

export default class EventListPresenter {
  boardComponent = new EventsListView();

  constructor({boardContainer, eventModel}) {
    this.boardContainer = boardContainer;
    this.eventModel = eventModel;
  }

  init() {
    this.boardEvents = [...this.eventModel.getEvents()];

    render(new SortingView(), this.boardContainer);
    render(this.boardComponent, this.boardContainer);
    render(new EditEventView(this.boardEvents[1]), this.boardComponent.getElement());
    render(new AddNewEventView(), this.boardComponent.getElement());

    for (let i = 0; i < this.boardEvents.length; i++) {
      render(new EventsItemView({event: this.boardEvents[i]}), this.boardComponent.getElement());
    }
  }
}

import EventsListView from '../view/events-list-view.js';
import EditEventView from '../view/edit-form-view.js';
import AddNewEventView from '../view/add-form-view.js';
import EventsItemView from '../view/events-item-view.js';
import SortingView from '../view/sorting-view.js';
import { render } from '../render.js';

export default class EventListPresenter {
  boardComponent = new EventsListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new SortingView(), this.boardContainer);
    render(this.boardComponent, this.boardContainer);
    render(new EditEventView(), this.boardComponent.getElement());
    render(new AddNewEventView(), this.boardComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventsItemView(), this.boardComponent.getElement());
    }
  }
}

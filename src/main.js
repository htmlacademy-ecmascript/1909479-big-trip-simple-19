import { render } from './render.js';
import FilterView from './view/filter-view.js';
import EventListPresenter from './presenter/event-list-presenter.js';
import EventsModel from './model/event-model.js';

const filterElement = document.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.page-main');
const sectionElement = mainElement.querySelector('.trip-events');
const eventModel = new EventsModel();
const eventListPresenter = new EventListPresenter({
  boardContainer: sectionElement,
  eventModel
});

render(new FilterView(), filterElement);
eventListPresenter.init();

import {render} from './framework/render.js';
import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import EventsModel from './model/event-model.js';
import { generateFilter } from './mock/filter-mock.js';

const filterElement = document.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.page-main');
const sectionElement = mainElement.querySelector('.trip-events');
const eventModel = new EventsModel();
const filters = generateFilter(eventModel.events);
const eventListPresenter = new BoardPresenter({
  boardContainer: sectionElement,
  eventModel
});

render(new FilterView({filters}), filterElement);
eventListPresenter.init();

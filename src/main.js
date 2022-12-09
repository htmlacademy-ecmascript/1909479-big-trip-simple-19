import { render } from './render.js';
import FilterView from './view/filter-view.js';
import EventListPresenter from './presenter/event-list-presenter.js';

const headerElement = document.querySelector('.page-header');
const filterElement = headerElement.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.page-main');
const sectionElement = mainElement.querySelector('.trip-events');
const pointListPresenter = new EventListPresenter({boardContainer: sectionElement});

render(new FilterView(), filterElement);
pointListPresenter.init();

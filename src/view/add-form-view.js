import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { humanizeFormDate } from '../utils/utils';
import { offersByType, Destinations } from '../mock/event-mock.js';

function createOffersTemplate(checkingOffers, currentType) {

  const eventTypeOffers = offersByType.find((offer) => offer.type === currentType);

  return eventTypeOffers.offers.map((offer) => {

    const checked = checkingOffers.includes(offer.id) ? 'checked' : '';

    return `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${checked}>
          <label class="event__offer-label" for="event-offer-luggage-1">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`;}).join('');
}

function createDestinationListTemplate (destinations) {
  return destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');
}

function createDestinationName (currentDestination) {
  if (currentDestination !== null) {
    return Destinations.find(({id}) => currentDestination === id)?.name;
  } else {
    return '';
  }
}

function createDestinationDescription (currentDestination) {
  if (currentDestination !== null) {
    return Destinations.find(({id}) => currentDestination === id)?.description;
  } else {
    return '';
  }
}

function createDestinationPictures (currentDestination) {
  if (currentDestination !== null) {
    return Destinations?.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`);
  } else {
    return '';
  }
}

function createTemplateAddNewEvent(event) {
  const {type, destination, basePrice, id, dateFrom, offers, dateTo} = event;
  const firstDate = humanizeFormDate(dateFrom);
  const secondDate = humanizeFormDate(dateTo);

  const eventsByType = offersByType.map((offer) =>
    `<div class="event__type-item">
      <input id="event-type-${offer.type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer.type}">
      <label class="event__type-label  event__type-label--${offer.type.toLowerCase()}" for="event-type-${offer.type.toLowerCase()}-1">${offer.type}</label>
    </div>`
  ).join('');

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${eventsByType}
          </fieldset>
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value=${createDestinationName(destination)} list="destination-list-${id}">
        <datalist id="destination-list-${id}">
        ${createDestinationListTemplate(Destinations)}
        </datalist>
      </div>
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${firstDate}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${secondDate}">
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${createOffersTemplate(offers, type)}
        </div>
      </section>
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${createDestinationDescription(destination)}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${createDestinationPictures()}
          </div>
        </div>
      </section>
    </section>
  </form>
</li>`;
}

export default class AddNewEventView extends AbstractStatefulView{
  #handleFormSubmit = null;
  #handlerFormClick = null;

  constructor ({event, onFormSubmit, onFormClick}) {
    super();
    this._setState(AddNewEventView.parseEventToState(event));
    this.#handleFormSubmit = onFormSubmit;
    this.#handlerFormClick = onFormClick;

    this._restoreHandlers();
  }

  get template() {
    return createTemplateAddNewEvent(this._state);
  }

  _restoreHandlers() {

    this.element.addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formClickHandler);

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeToggleHandler);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationInputHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(AddNewEventView.parseStateToEvent(this._state));
  };

  #formClickHandler = () => this.#handlerFormClick();

  #typeToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      offers: [],
      type: evt.target.value,
    });
  };

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    let actualDestinationID = null;
    Destinations.map((destination) => {
      if (destination.name === evt.target.value) {
        actualDestinationID = destination.id;
      }
    });

    this.updateElement({
      destination: actualDestinationID,
    });
  };

  static parseEventToState(event) {
    return {...event,};
  }

  static parseStateToEvent(state) {
    const event = {...state};

    return event;
  }

  reset(event) {
    this.updateElement(
      AddNewEventView.parseEventToState(event),
    );
  }
}

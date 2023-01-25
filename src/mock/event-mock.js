import { getRandomArrayElement, getRandomInteger } from '../utils/utils';
import { CITIES, EVENTS_TYPE, DESCRIPTIONS } from '../const';
import { nanoid } from 'nanoid';

const Destinations = [
  {
    id: 1,
    description: Array.from({length: getRandomInteger(1,4)},() => getRandomArrayElement(DESCRIPTIONS)).join(' ') ,
    name: getRandomArrayElement(CITIES),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 1000)}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 1000)}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 1000)}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      }
    ]
  },
  {
    id: 2,
    description: Array.from({length: getRandomInteger(1,4)},() => getRandomArrayElement(DESCRIPTIONS)).join(' '),
    name: getRandomArrayElement(CITIES),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 1000)}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 1000)}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 1000)}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      }
    ]
  },
  {
    id: 3,
    description: Array.from({length: getRandomInteger(1,4)},() => getRandomArrayElement(DESCRIPTIONS)).join(' '),
    name: getRandomArrayElement(CITIES),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 1000)}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 1000)}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 1000)}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      }
    ]
  },
  {
    id: 4,
    description: Array.from({length: getRandomInteger(1,4)},() => getRandomArrayElement(DESCRIPTIONS)).join(' '),
    name: getRandomArrayElement(CITIES),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 1000)}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 1000)}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 1000)}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      }
    ]
  },
];

const offersByType = [
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 2,
        title: 'Swith to comfort class',
        price: 100
      },
      {
        id: 3,
        title: 'Add meal',
        price: 15
      },
      {
        id: 4,
        title: 'Choose seats',
        price: 5
      },
      {
        id: 5,
        title: 'Travel by train',
        price: 40
      },
    ]
  },
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Order Uber',
        price: 20
      },
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'Rent a car',
        price: 200
      },
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 1,
        title: 'Book tickets',
        price: 40
      },
      {
        id: 2,
        title: 'Lunch in city',
        price: 30
      },
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'Add breakfast',
        price: 50
      },
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Look out the window',
        price: 0.5
      },
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Open a window',
        price: 5
      },
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'Order dinner',
        price: 85
      },
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 1,
        title: 'Book a table',
        price: 25
      },
    ]
  },
];

const mockEvent = [
  {
    basePrice: 1000,
    dateFrom: '2022-02-10T12:20:56.845Z',
    dateTo: '2022-02-10T20:22:13.375Z',
    destination: getRandomInteger(1, 4),
    offers: [8],
    type: getRandomArrayElement(EVENTS_TYPE)
  },
  {
    basePrice: 100,
    dateFrom: '2019-07-11T12:55:56.845Z',
    dateTo: '2019-07-11T14:53:13.375Z',
    destination: getRandomInteger(1, 4),
    offers:  [1,4],
    type: getRandomArrayElement(EVENTS_TYPE)
  },
  {
    basePrice: 1500,
    dateFrom: '2019-11-11T09:03:56.845Z',
    dateTo: '2019-11-11T12:50:13.375Z',
    destination: getRandomInteger(1, 4),
    offers:  [1,2],
    type: getRandomArrayElement(EVENTS_TYPE)
  },

];

function getRandomEvent () {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockEvent),
  };
}

export {getRandomEvent, offersByType, Destinations};

import { filter } from '../utils/filter-utils';

function generateFilter(events) {
  return Object.entries(filter).map(
    ([filterName, filterTasks]) => ({
      name: filterName,
      count: filterTasks(events).length,
    }),
  );
}

export { generateFilter };

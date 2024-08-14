import { createSelector } from 'reselect';

export const selectFilters = (state) => state.search.filters;

export const filtersSelector = createSelector(selectFilters, (value) => value);

import { SEARCH_TYPE } from '../type';

export const setLoadingSearch = (value) => ({
    type: SEARCH_TYPE.LOADING_SEARCH,
    payload: value,
});

export const setQuery = (value) => ({
    type: SEARCH_TYPE.SET_QUERY,
    payload: value,
});

export const setFilters = (value) => ({
    type: SEARCH_TYPE.SET_FILTERS,
    payload: value,
});

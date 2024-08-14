import { makeDispatchable, makeSelector } from 'lib/hooks';
import { setQuery, setFilters } from '@/redux/actions/search-actions';

//state selectors
export const useQuery = makeSelector('search.query');
export const useFilters = makeSelector('search.filters');

//dispatch
export const useSetQuery = makeDispatchable(setQuery);
export const useSetFilters = makeDispatchable(setFilters);


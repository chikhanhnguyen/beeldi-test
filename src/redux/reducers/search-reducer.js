import { SEARCH_TYPE } from '../type';

const initialState = {
    loading: false,
    query: '',
    filters: ['name'],
};

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_TYPE.LOADING_SEARCH:
            return {
                ...state,
                loading: action.payload,
            };
        case SEARCH_TYPE.SET_QUERY:
            return {
                ...state,
                query: action.payload,
            };
        case SEARCH_TYPE.SET_FILTERS:
            return {
                ...state,
                filters: action.payload,
            };
        default:
            return state;
    }
}

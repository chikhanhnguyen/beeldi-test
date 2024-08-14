import { UI_TYPE } from '../type';

export const setError = (error) => ({
    type: UI_TYPE.SET_ERROR,
    payload: error,
});

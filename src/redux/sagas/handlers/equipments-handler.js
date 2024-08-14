import { loadedEquipments, loadingEquipments, setEquipments } from '../../actions/equipments-actions';
import { getEquipments } from '../requests/equipments-request';

import { call, put } from 'redux-saga/effects';

import _ from 'lodash';

export function* handleGetEquipments(action) {
    if (action.payload.page === 1) yield put(loadingEquipments());
    try {
        const response = yield call(getEquipments, action.payload.page);
        if (_.get(response, 'data')) {
            yield put(setEquipments(response.data, action.payload.page));
        }
    } catch (error) {
        console.log(error);
    }
    if (action.payload.page === 1) yield put(loadedEquipments());
}

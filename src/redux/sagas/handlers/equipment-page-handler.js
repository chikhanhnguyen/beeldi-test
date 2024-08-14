import { call, put } from 'redux-saga/effects';

import { getEquipmentById } from '../requests/equipment-page-request';

import { setEquipment, loadingEquipment, loadedEquipment } from '@/redux/actions/equipment-page-actions';

export function* handleGetEquipmentById(action) {
    yield put(loadingEquipment());
    const response = yield call(getEquipmentById, action.payload);
    if (response && response.status === 200) {
        const equipment = response.data;
        yield put(setEquipment(equipment));
        yield put(loadedEquipment());
    }
}

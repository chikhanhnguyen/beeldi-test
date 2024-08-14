import { EQUIPMENTS_TYPE } from '../../type';
import { handleGetEquipments } from '../handlers/equipments-handler';
import { takeLatest } from 'redux-saga/effects';

export function* watchGetEquipments() {
    yield takeLatest(EQUIPMENTS_TYPE.GET_EQUIPMENTS, handleGetEquipments);
}

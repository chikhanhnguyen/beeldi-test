import { EQUIPMENTS_TYPE } from '../../type';
import { handleSearchEquipments } from '../handlers/search-handler';
import { takeLatest } from 'redux-saga/effects';

export function* watchSearchEquipments() {
    yield takeLatest(EQUIPMENTS_TYPE.GET_SEARCH_EQUIPMENTS, handleSearchEquipments);
}

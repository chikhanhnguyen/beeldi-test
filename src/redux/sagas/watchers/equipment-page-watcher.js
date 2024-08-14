import { EQUIPMENT_TYPE } from "../../type";
import { handleGetEquipmentById } from "../handlers/equipment-page-handler"
import { takeLatest } from 'redux-saga/effects';

export function* watchGetEquipmentById() {
    yield takeLatest(EQUIPMENT_TYPE.GET_EQUIPMENT_BY_ID, handleGetEquipmentById);
}
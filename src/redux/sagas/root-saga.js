import { watchGetEquipments } from './watchers/equipments-watcher';
import { watchGetEquipmentById } from './watchers/equipment-page-watcher';
import { watchSearchEquipments } from './watchers/search-watcher';

import { all } from 'redux-saga/effects';

export function* rootSaga() {
    yield all([
        // equipment page
        watchGetEquipmentById(),
        // equipment
        watchGetEquipments(),
        // search equipment
        watchSearchEquipments(),
    ]);
}

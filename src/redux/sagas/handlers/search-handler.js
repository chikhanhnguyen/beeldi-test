import { loadedEquipments, loadingEquipments, setSearchEquipments } from '../../actions/equipments-actions';
import { searchEquipments } from '../requests/search-request';

import { call, put, select } from 'redux-saga/effects';

import { selectFilters } from '@/redux/selectors/search-selector';
import _ from 'lodash';

export function* handleSearchEquipments(action) {
    if (action.payload.page === 1) yield put(loadingEquipments());
    try {
        const filters = yield select(selectFilters);
        const response = yield call(searchEquipments, action.payload.page, action.payload.query, filters);
        if (_.get(response, 'data')) {
            yield put(setSearchEquipments(response.data, action.payload.page));
        }
    } catch (error) {
        console.log(error);
    }
    if (action.payload.page === 1) yield put(loadedEquipments());
}

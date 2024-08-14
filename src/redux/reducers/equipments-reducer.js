import { EQUIPMENTS_TYPE } from '../type';
import { CONST_VAR } from 'config/app-config';

const initListEquipment = {
    equipments: [],
    page: 1,
    count: 0,
    isEnd: false,
};

const initialState = {
    listEquipments: initListEquipment,
    listSearchEquipments: initListEquipment,
    loading: false,
    filter: '',
};

export default function equipmentsReducer(state = initialState, action) {
    switch (action.type) {
        case EQUIPMENTS_TYPE.LOADING:
            return {
                ...state,
                loading: true,
            };
        case EQUIPMENTS_TYPE.LOADED:
            return {
                ...state,
                loading: false,
            };
        case EQUIPMENTS_TYPE.SET_EQUIPMENT_FILTER:
            return {
                ...state,
                filter: action.payload.filter,
            };
        case EQUIPMENTS_TYPE.SET_EQUIPMENTS:
            return {
                ...state,
                listEquipments: {
                    ...action.payload,
                    equipments:
                        action.payload.page === 1
                            ? action.payload.equipments
                            : [...state.listEquipments.equipments, ...action.payload.equipments],
                    page: action.payload.page,
                    count: action.payload.count,
                    isEnd: action.payload.equipments.length < CONST_VAR.PAGE_SIZE,
                },
            };
        case EQUIPMENTS_TYPE.SET_SEARCH_EQUIPMENTS:
            return {
                ...state,
                listSearchEquipments: {
                    ...action.payload,
                    equipments:
                        action.payload.page === 1
                            ? action.payload.equipments
                            : [...state.listSearchEquipments.equipments, ...action.payload.equipments],
                    page: action.payload.page,
                    count: action.payload.count,
                    isEnd: action.payload.equipments.length < CONST_VAR.PAGE_SIZE,
                },
            };
        default:
            return state;
    }
}

import { EQUIPMENTS_TYPE } from '../type';
import { CONST_VAR } from 'config/app-config';

export const setEquipments = (data, page) => ({
    type: EQUIPMENTS_TYPE.SET_EQUIPMENTS,
    payload: {
        equipments: data.data,
        page: page,
        count: data.count,
        isEnd: data.length < CONST_VAR.PAGE_SIZE,
    },
});

export const getEquipments = (page) => {
    return {
        type: EQUIPMENTS_TYPE.GET_EQUIPMENTS,
        payload: {
            page: page,
        },
    };
};

// search
export const setSearchEquipments = (data, page) => ({
    type: EQUIPMENTS_TYPE.SET_SEARCH_EQUIPMENTS,
    payload: {
        equipments: data.data,
        page: page,
        count: data.count,
        isEnd: data.length < CONST_VAR.PAGE_SIZE,
    },
});

export const getSearchEquipments = (query, page) => {
    return {
        type: EQUIPMENTS_TYPE.GET_SEARCH_EQUIPMENTS,
        payload: {
            query: query,
            page: page,
        },
    };
};

//
export const loadingEquipments = () => ({
    type: EQUIPMENTS_TYPE.LOADING,
});

export const loadedEquipments = () => ({
    type: EQUIPMENTS_TYPE.LOADED,
});

export const setEquipmentFilter = (filter) => ({
    type: EQUIPMENTS_TYPE.SET_EQUIPMENT_FILTER,
    payload: {
        filter: filter,
    },
});

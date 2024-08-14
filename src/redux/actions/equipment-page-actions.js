import { EQUIPMENT_TYPE } from '../type';

export const getEquipmentById = (id) => ({
    type: EQUIPMENT_TYPE.GET_EQUIPMENT_BY_ID,
    payload: id,
});

export const loadingEquipment = () => ({
    type: EQUIPMENT_TYPE.LOADING_EQUIPMENT,
});

export const loadedEquipment = () => ({
    type: EQUIPMENT_TYPE.LOADED_EQUIPMENT,
});

export const setEquipment = (equipment) => ({
    type: EQUIPMENT_TYPE.SET_EQUIPMENT,
    payload: {
        equipment: equipment
    },
});
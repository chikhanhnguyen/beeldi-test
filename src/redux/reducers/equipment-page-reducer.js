import { EQUIPMENT_TYPE } from '../type';

const initialState = {
    equipment: {},
    isLoadingEquipment: false,
};

export default function equipmentPageReducer(state = initialState, action) {
    switch (action.type) {
        case EQUIPMENT_TYPE.SET_EQUIPMENT:
            return {
                ...state,
                equipment: action.payload.equipment,
            };
        case EQUIPMENT_TYPE.LOADING_EQUIPMENT:
            return {
                ...state,
                isLoadingEquipment: true,
            };
        case EQUIPMENT_TYPE.LOADED_EQUIPMENT:
            return {
                ...state,
                isLoadingEquipment: false,
            };
        default:
            return state;
    }
}

import { createSelector } from 'reselect';

export const selectEquipment = (state) => state.equipmentPage.equipment;
export const equipmentSelector = createSelector(
    selectEquipment,
    value => value
)

export const selectLoadingEquipment = (state) => state.equipmentPage.isLoadingEquipment;
export const loadingEquipmentSelector = createSelector(
    selectLoadingEquipment,
    value => value
)

import { createSelector } from 'reselect';

export const selectListEquipments = (state) => state.equipments.listEquipments;

export const listEquipmentsSelector = createSelector(selectListEquipments, (value) => value);

// search
export const selectListSearchEquipments = (state) => state.equipments.listSearchEquipments;

export const listSearchEquipmentsSelector = createSelector(selectListSearchEquipments, (value) => value);

//
const selectEquipments = (state) => state.equipments;

export const equipmentsSelector = createSelector(selectEquipments, (value) => value);

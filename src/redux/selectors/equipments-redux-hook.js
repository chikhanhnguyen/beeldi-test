import { makeDispatchable, makeSelector } from 'lib/hooks';
import { getEquipments, getSearchEquipments, setEquipmentFilter } from '@/redux/actions/equipments-actions';

//state selectors
export const useListEquipments = makeSelector('equipments.listEquipments');
export const useLoading = makeSelector('equipments.loading');
export const useListSearchEquipments = makeSelector('equipments.listSearchEquipments');

//dispatches
export const useGetEquipments = makeDispatchable(getEquipments);
export const useSetEquipmentFilter = makeDispatchable(setEquipmentFilter);
export const useGetSearchEquipments = makeDispatchable(getSearchEquipments);

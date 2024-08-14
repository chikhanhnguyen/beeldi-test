import {
    getAllEquiments,
    getAllCheckpoints,
    process_list_equipments,
    process_single_equiment,
    process_filter_equipments,
    mockAxios,
} from './mock-backend-util';


// Get list of equipments
export async function mockAllEquipments(pageNumber, pageSize) {
    try {
        const allEquipments = await getAllEquiments();
        const processedData = process_list_equipments(allEquipments, pageNumber, pageSize);
        return await mockAxios(processedData);
    } catch (error) {
        return Promise.reject(error);
    }
}

// Get equipment by key
export async function mockGetEquipmentByKey(eKey) {
    try {
        const allEquipments = await getAllEquiments();
        const allCheckpoints = await getAllCheckpoints();
        const processedData = process_single_equiment(allEquipments, allCheckpoints, eKey);
        return await mockAxios(processedData);
    } catch (error) {
        return Promise.reject(error);
    }
}

// Search equipment
export async function mockSearchEquipments(queryStr, filters, pageNumber, pageSize) {
    try {
        const allEquipments = await getAllEquiments();
        const processedData = process_filter_equipments(allEquipments, queryStr, filters, pageNumber, pageSize);
        return await mockAxios(processedData);
    } catch (error) {
        return Promise.reject(error);
    }
}

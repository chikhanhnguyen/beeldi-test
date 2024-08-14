import { isProd } from './env-config';

const API_URL =
    isProd
        ? 'https://prod-web/'
        : '/';

export const apiConfig = {
    // get equipments
    apiGetEquipment: `${API_URL}api/equipment`,
    apiGetEquipmentById: `${API_URL}api/equipment`,

    // search api
    apiSearchEquipment: `${API_URL}api/equipment`,
};

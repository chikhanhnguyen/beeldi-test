import axios from 'axios';
import { apiConfig } from 'config/api-url';
import { xAuthToken } from 'config/authen-config';
import { isProd } from 'config/env-config';
import { mockGetEquipmentByKey } from '@/backend/mock-backend';

export function getEquipmentById(id) {
    if (!isProd) {
        return mockGetEquipmentByKey(id);
    }

    return axios.get(`${apiConfig.apiGetEquipmentById}/${id}`, {
        headers: xAuthToken(),
    });
}

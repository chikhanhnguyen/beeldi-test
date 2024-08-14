import axios from 'axios';
import { apiConfig } from 'config/api-url';
import { xAuthToken } from 'config/authen-config';
import { CONST_VAR } from 'config/app-config';
import { isProd } from 'config/env-config';
import { mockAllEquipments } from '@/backend/mock-backend';

export function getEquipments(page) {
    if (!isProd) {
        return mockAllEquipments(page, CONST_VAR.PAGE_SIZE);
    }
    let url = `${apiConfig.apiGetEquipment}?PageNumber=${page}&PageSize=${CONST_VAR.PAGE_SIZE}`;

    return axios.get(url, {
        headers: xAuthToken(),
    });
}

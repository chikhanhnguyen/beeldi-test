import axios from 'axios';
import { apiConfig } from 'config/api-url';
import { xAuthToken } from 'config/authen-config';
import { CONST_VAR } from 'config/app-config';
import { isProd } from 'config/env-config';
import { mockSearchEquipments } from '@/backend/mock-backend';

export function searchEquipments(page, query, filters) {
    if (!isProd) {
        return mockSearchEquipments(query, filters, page, CONST_VAR.PAGE_SIZE);
    }

    let url = `${apiConfig.apiSearchEquipment}?Query=${text}&Filter=${filters}PageNumber=${page}&PageSize=${CONST_VAR.PAGE_SIZE}`;

    return axios.get(url, {
        headers: xAuthToken(),
    });
}

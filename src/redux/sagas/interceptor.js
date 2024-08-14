import axios from 'axios';
import { apiConfig } from 'config/api-url';
import { UI_TYPE } from '@/redux/type';

export const onSuccess = (store, res) => {
    return new Promise((resolve) => {
        resolve(res);
    });
};

let isRefreshing = false;

export const onFailure = (store, error) => {
    const { response } = error;
    const errorCode = store.getState().ui.errorCode;

    if (!errorCode && [500, 404].includes(response.status)) {
        store.dispatch({
            type: UI_TYPE.SET_ERROR,
            payload: response.status,
        });
    }

    if (response.status === 401) {
        return new Promise((resolve) => {
            // in case we want to add authentication
            const userInfos = JSON.parse(localStorage.getItem('userInfos'));

            if (!isRefreshing && userInfos) {
                isRefreshing = true;
                axios
                    .post(apiConfig.apiGetNewToken)
                    .then((response) => {
                        isRefreshing = false;
                        if (!response || !response.data) {
                            localStorage.removeItem('userInfos');
                            window.location.reload();
                        } else resolve(error);
                    })
                    .catch((err) => {
                        localStorage.removeItem('userInfos');
                        window.location.reload();
                        isRefreshing = false;
                    });
            } else resolve(error);
        });
    }
    return Promise.resolve(error);
};

export default function interceptors(store) {
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    axios.interceptors.response.use(
        (response) => onSuccess(store, response),
        (error) => onFailure(store, error)
    );
}

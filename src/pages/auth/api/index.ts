import { API_BASE_URL } from '@shared/lib';
import { HTTPTransport } from '@shared/utils';

import { AuthData } from '../model/types';

export const fetchAuthData = (data: AuthData) => {
    return HTTPTransport.post(`${API_BASE_URL}/auth/signin`, {
        data,
        jsonParse: false
    });
};

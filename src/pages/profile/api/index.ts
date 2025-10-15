import { UserData } from '@entities/user';
import { API_BASE_URL } from '@shared/lib';
import { HTTPTransport } from '@shared/utils';

import { PasswordData } from '../model/types';

export const logoutRequest = () => {
    return HTTPTransport.post(`${API_BASE_URL}/auth/logout`, { jsonParse: false });
};

export const changePasswordRequest = (data: PasswordData) => {
    return HTTPTransport.put(`${API_BASE_URL}/user/password`, { data, jsonParse: false });
};

export const changeProfileDataRequest = (data: UserData) => {
    return HTTPTransport.put(`${API_BASE_URL}/user/profile`, { data, jsonParse: false });
};

export const uploadAvatarRequest = (data: FormData) => {
    return HTTPTransport.put(`${API_BASE_URL}/user/profile/avatar`, {
        data: data,
        headers: { contentType: 'formData' }
    });
};

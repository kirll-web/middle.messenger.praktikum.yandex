import { API_BASE_URL } from '@shared/lib';
import { HTTPTransport } from '@shared/utils';

import { RegistrationData } from '../model';

export const fetchRegistrationData = (data: RegistrationData) => {
    return HTTPTransport.post(`${API_BASE_URL}/auth/signup`, { data });
};

import { API_BASE_URL } from '@shared/lib';
import { HTTPTransport } from '@shared/utils';

import { UserDto } from './dto';

export const getUserRequest = () => HTTPTransport.get<UserDto>(`${API_BASE_URL}/auth/user`);

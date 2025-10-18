import { isApiResponseSuccess } from '@shared/utils';

import { changePasswordRequest } from '../api';
import { PasswordData } from '../model/types';

export const changePassword = async (data: PasswordData): Promise<boolean> => {
    const response = await changePasswordRequest(data);

    if (isApiResponseSuccess(response)) {
        return true;
    }

    return false;
};

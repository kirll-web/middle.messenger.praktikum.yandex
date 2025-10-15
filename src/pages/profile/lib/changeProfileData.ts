import { UserData } from '@entities/user';
import { isApiResponseSuccess } from '@shared/utils';

import { changeProfileDataRequest } from '../api';

export const changeProfileData = async (data: UserData): Promise<boolean> => {
    const response = await changeProfileDataRequest(data);

    if (isApiResponseSuccess(response)) {
        return true;
    }

    return false;
};

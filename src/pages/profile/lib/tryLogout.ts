import { isApiResponseSuccess } from '@shared/utils';

import { logoutRequest } from '../api';

export const tryLogout = async (): Promise<boolean> => {
    const response = await logoutRequest();

    if (isApiResponseSuccess(response)) {
        return true;
    }

    return false;
};

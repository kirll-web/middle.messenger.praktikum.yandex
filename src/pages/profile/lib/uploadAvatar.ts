import { isApiResponseSuccess } from '@shared/utils';

import { uploadAvatarRequest } from '../api';

export const uploadAvatar = async (formData: FormData): Promise<boolean> => {
    const response = await uploadAvatarRequest(formData);

    if (isApiResponseSuccess(response)) {
        return true;
    }

    return false;
};

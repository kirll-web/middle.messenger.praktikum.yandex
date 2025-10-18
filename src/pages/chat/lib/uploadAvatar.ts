import { isApiResponseSuccess } from '@shared/utils';

import { uploadAvatarRequest } from '../api';

export const uploadAvatar = async (chatId: number, formData: FormData): Promise<boolean> => {
    formData.append('chatId', chatId.toString());
    const response = await uploadAvatarRequest(formData);

    if (isApiResponseSuccess(response)) {
        return true;
    }

    return false;
};

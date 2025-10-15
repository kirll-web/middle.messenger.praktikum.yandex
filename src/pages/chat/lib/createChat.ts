import { isApiResponseSuccess } from '@shared/utils';

import { createChatRequest } from '../api';

export const tryCreateChat = async (title: string): Promise<boolean> => {
    const response = await createChatRequest(title);

    if (isApiResponseSuccess(response)) {
        return true;
    }

    return false;
};

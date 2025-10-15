import { isApiResponseSuccess } from '@shared/utils';

import { deleteChatRequest } from '../api';

export const tryDeleteChat = async (chatId: number): Promise<boolean> => {
    const response = await deleteChatRequest(chatId);

    if (isApiResponseSuccess(response)) {
        return true;
    }

    return false;
};

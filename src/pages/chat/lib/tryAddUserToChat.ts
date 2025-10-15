import { isApiResponseSuccess } from '@shared/utils';

import { addUserToChatRequest } from '../api';

export const tryAddUserToChat = async (userId: string, chatId: number): Promise<boolean> => {
    const response = await addUserToChatRequest(userId, chatId);

    if (isApiResponseSuccess(response)) {
        return true;
    }

    return false;
};

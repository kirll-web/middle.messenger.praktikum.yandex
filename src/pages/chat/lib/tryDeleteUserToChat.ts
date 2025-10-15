import { isApiResponseSuccess } from '@shared/utils';

import { deleteUserToChatRequest } from '../api';

export const tryDeleteUserToChat = async (userId: string, chatId: number): Promise<boolean> => {
    const response = await deleteUserToChatRequest(userId, chatId);

    if (isApiResponseSuccess(response)) {
        return true;
    }

    return false;
};

import { isApiResponseSuccess } from '@shared/utils';

import { getChatsRequest, getChatTokenRequest } from '../api';
import { ChatData } from '../model/types';

export const getChats = async (): Promise<ChatData[]> => {
    const response = await getChatsRequest();

    if (isApiResponseSuccess(response)) {
        return response.data as ChatData[];
    }

    return [];
};

export const getChatToken = async (chatId: number): Promise<string | undefined> => {
    const response = await getChatTokenRequest(chatId);

    if (isApiResponseSuccess(response)) {
        return response.data.token;
    }

    return undefined;
};

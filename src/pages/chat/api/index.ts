import { API_BASE_URL } from '@shared/lib';
import { HTTPTransport } from '@shared/utils';

import { ChatData, ChatTokenResponse } from '../model/types';

export const getChatsRequest = () => {
    return HTTPTransport.get<ChatData[]>(`${API_BASE_URL}/chats`);
};

export const createChatRequest = (title: string) => {
    return HTTPTransport.post(`${API_BASE_URL}/chats`, { data: { title }, jsonParse: false });
};

export const addUserToChatRequest = (userId: string, chatId: number) => {
    return HTTPTransport.put(`${API_BASE_URL}/chats/users`, { data: { users: [userId], chatId }, jsonParse: false });
};

export const deleteUserToChatRequest = (userId: string, chatId: number) => {
    return HTTPTransport.delete(`${API_BASE_URL}/chats/users`, { data: { users: [userId], chatId }, jsonParse: false });
};

export const uploadAvatarRequest = (data: FormData) => {
    return HTTPTransport.put(`${API_BASE_URL}/chats/avatar`, { data: data, headers: { contentType: 'formData' } });
};

export const getChatTokenRequest = (chatId: number) => {
    return HTTPTransport.post<ChatTokenResponse>(`${API_BASE_URL}/chats/token/${chatId}`);
};

export const deleteChatRequest = (chatId: number) => {
    return HTTPTransport.delete(`${API_BASE_URL}/chats`, { data: { chatId }, jsonParse: false });
};

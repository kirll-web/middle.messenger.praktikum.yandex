import { User } from '@entities/user';

export type ChatData = {
    id: number;
    title: string;
    avatar: string | null;
    unread_count: number;
    created_by: number;
    last_message: LastMessage | null;
};

export type LastMessage = {
    user: User;
    time: string;
    content: string;
};

export type ChatTokenResponse = {
    token: string;
};

export type ChatFileData = {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
};

export type ChatMessageType = 'message' | 'file';

export type ChatMessageData = {
    chat_id: number;
    time: string;
    type: ChatMessageType;
    user_id: number;
    content: string;
    file?: ChatFileData;
};

export type ChatMessagesResponse = ChatMessageData[];

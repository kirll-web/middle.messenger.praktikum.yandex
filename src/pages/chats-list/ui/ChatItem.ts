import { Avatar } from '@shared/ui';
import { Block } from '@shared/utils';
import template from '../template/chat-item.hbs?raw';
import { ChatItemCounter } from './ChatItemCounter';
import { ChatItemMessage } from './ChatItemMessage';

export type ChatItemProps = {
    name: string;
    lastMessage: string;
    time: string;
    messageCount?: number;
    Avatar: Avatar;
    thisUserMessage?: boolean;
};

export class ChatItem extends Block {
    constructor({ name, lastMessage, time, messageCount, Avatar, thisUserMessage }: ChatItemProps) {
        super({
            name,
            lastMessage,
            lastMessageTime: time,
            ChatItemMessage: new ChatItemMessage({
                message: lastMessage,
                userMessage: !!thisUserMessage
            }),
            ChatItemCounter: messageCount && new ChatItemCounter({ count: messageCount }),
            Avatar: Avatar
        });
    }

    override render(): string {
        return template;
    }
}

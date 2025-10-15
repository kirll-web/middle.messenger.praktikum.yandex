import { userStore } from '@entities/user';
import { Block } from '@shared/utils';

import { MessageService } from '../lib/MessageService';
import { ChatMessageData } from '../model/types';
import template from '../template/chat.hbs?raw';
import { ChatFooter } from './ChatFooter';
import { ChatMessage } from './ChatMessage';
import { ChatProfile } from './ChatProfile';

export type ChatProps = {
    chatId: number;
    ChatProfile?: ChatProfile;
};

export class Chat extends Block {
    chatId: number;
    token?: string;
    messageService: MessageService;
    override lists = {
        messages: []
    };

    constructor({ ChatProfile, chatId }: ChatProps) {
        super({
            ChatProfile: ChatProfile,
            ChatFooter: new ChatFooter((value: string) => this.messageService.sendMessage(value))
        });

        this.messageService = new MessageService(chatId, this.setMessages);
        this.chatId = chatId;
    }

    private setMessages = (messages: ChatMessageData[]) => {
        const user = userStore.getState().user;
        if (!user) {
            return;
        }

        const blocks = messages.map(
            (message) =>
                new ChatMessage({
                    content: {
                        text: message.content,
                        time: message.time
                    },
                    owner: user.id === message.user_id
                })
        );

        this.updateList('messages', blocks);
    };

    override render() {
        return template;
    }
}

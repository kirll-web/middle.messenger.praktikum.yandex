import { Block } from '@shared/utils';

import template from '../template/chat.hbs?raw';
import { ChatDate } from './ChatDate';
import { ChatFooter } from './ChatFooter';
import { ChatMessage } from './ChatMessage';
import { ChatProfile } from './ChatProfile';

export type ChatProps = {
    ChatProfile?: ChatProfile;
    messages?: (ChatDate | ChatMessage)[];
};

export class Chat extends Block {
    constructor({ messages, ChatProfile }: ChatProps) {
        super({
            ChatProfile: ChatProfile,
            messages,
            ChatFooter: new ChatFooter()
        });
    }

    override render() {
        return template;
    }
}

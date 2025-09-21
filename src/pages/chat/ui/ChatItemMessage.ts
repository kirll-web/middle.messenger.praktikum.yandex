import { Block } from '@shared/utils';

import template from '../template/chat-item-message.hbs?raw';

export type ChatItemMessageProps = {
    message: string;
    userMessage: boolean;
};

export class ChatItemMessage extends Block {
    constructor({ message, userMessage }: ChatItemMessageProps) {
        super({
            message,
            userMessage
        });
    }

    override render(): string {
        return template;
    }
}

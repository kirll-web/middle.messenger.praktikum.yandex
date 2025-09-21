import { Block } from '@shared/utils';
import template from '../template/chat-footer.hbs?raw';
import { ChatFileButton } from './ChatFileButton';
import { ChatInput } from './ChatInput';
import { ChatSendButton } from './ChatSendButton';

export class ChatFooter extends Block {
    constructor() {
        super({
            ChatFileButton: new ChatFileButton(),
            ChatInput: new ChatInput(),
            ChatSendButton: new ChatSendButton()
        });
    }

    override render() {
        return template;
    }
}

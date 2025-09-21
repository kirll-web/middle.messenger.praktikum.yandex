import { Block } from '@shared/utils';
import template from '../template/chat-send-button.hbs?raw';

export class ChatSendButton extends Block {
    constructor() {
        super({
            showPlaceholder: false
        });
    }

    override render() {
        return template;
    }
}

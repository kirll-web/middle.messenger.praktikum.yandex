import { Block } from '@shared/utils';
import template from '../template/chat-input.hbs?raw';

export class ChatInput extends Block {
    constructor() {
        super({
            placeholder: 'Сообщение'
        });
    }

    override render() {
        return template;
    }
}

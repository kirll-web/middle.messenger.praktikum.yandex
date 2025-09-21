import { Validator } from '@shared/lib';
import { Block } from '@shared/utils';

import template from '../template/chat-input.hbs?raw';

export class ChatInput extends Block {
    private value: string = '';
    constructor() {
        super({
            placeholder: 'Сообщение',
            name: 'message',

            events: {
                change: (event: Event) => {
                    const input = event.target as HTMLInputElement;
                    this.value = input.value;
                }
            }
        });
    }

    public isValid = (): boolean => {
        return this.validate(this.value);
    };

    private validate = (value: string): boolean => {
        const valid = Validator.required(value);
        if (valid) {
            this.setProps({ error: undefined });
            return true;
        }
        return false;
    };

    override render() {
        return template;
    }
}

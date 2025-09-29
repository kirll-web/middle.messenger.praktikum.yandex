import { Block } from '@shared/utils';

import template from '../template/chat-date.hbs?raw';

export type ChatDateProps = {
    date: string;
};

export class ChatDate extends Block {
    constructor({ date }: ChatDateProps) {
        super({
            date
        });
    }

    override render() {
        return template;
    }
}

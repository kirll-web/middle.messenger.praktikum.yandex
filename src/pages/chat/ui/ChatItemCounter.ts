import { Block } from '@shared/utils';

import template from '../template/chat-item-counter.hbs?raw';

export type ChatItemCounterProps = {
    count: number;
};

export class ChatItemCounter extends Block {
    constructor({ count }: ChatItemCounterProps) {
        super({
            count
        });
    }

    override render(): string {
        return template;
    }
}

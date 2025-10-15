import { Block } from '@shared/utils';

import template from '../template/chat-stub.hbs?raw';

export class ChatStub extends Block {
    constructor() {
        super();
    }

    override render() {
        return template;
    }
}

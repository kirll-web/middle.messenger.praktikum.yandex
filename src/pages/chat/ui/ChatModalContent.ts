import { Form } from '@shared/ui';
import { Block } from '@shared/utils';

import template from '../template/chat-modal-content.hbs?raw';

export type ChatModalContentProps = {
    Form: Form;
};

export class ChatModalContent extends Block {
    constructor({ Form }: ChatModalContentProps) {
        super({ Form });
    }

    override render() {
        return template;
    }
}

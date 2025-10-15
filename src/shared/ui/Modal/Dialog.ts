import { Block } from '@shared/utils';

import template from './Dialog.hbs?raw';
type DialogProps = {
    Content: Block;
};

export class Dialog extends Block {
    constructor({ Content }: DialogProps) {
        super({
            Content
        });
    }

    override render() {
        return template;
    }
}

import { Block } from '@shared/utils';

import template from './BackIcon.hbs?raw';

export class BackIcon extends Block {
    constructor() {
        super();
    }

    override render() {
        return template;
    }
}

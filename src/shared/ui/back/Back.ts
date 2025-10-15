import { Block, Router } from '@shared/utils';

import { BackIcon } from '../BackIcon';
import template from './Back.hbs?raw';

export class Back extends Block {
    router: Router;
    constructor() {
        super({
            Icon: new BackIcon(),
            events: {
                click: () => this.router.back()
            }
        });
        this.router = new Router();
    }

    override render() {
        return template;
    }
}

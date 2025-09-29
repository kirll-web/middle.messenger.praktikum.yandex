import { Block } from '@shared/utils';

export abstract class AbstractSvgIcon extends Block {
    constructor() {
        super();
    }

    abstract template(): string;

    override render() {
        return this.template();
    }
}

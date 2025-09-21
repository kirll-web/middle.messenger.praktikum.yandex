import { Block, insertToObject } from '../../utils';
import template from './Link.hbs?raw';

export type LinkProps = {
    id?: string;
    text: string;
    className?: string;
    href?: string;
    onClick?(): unknown;
};

export class Link extends Block {
    constructor({ id, text, className, href, onClick }: LinkProps) {
        // console.log(id, text, className, href);
        super({
            id,
            text,
            attr: {
                ...insertToObject('class', className),
                ...insertToObject('href', href),
                ...insertToObject('id', id)
            },
            events: {
                ...insertToObject('click', onClick)
            }
        });
    }

    render() {
        return template;
    }
}

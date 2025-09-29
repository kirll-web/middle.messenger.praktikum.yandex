import { insertToObject } from '@shared/utils';

import { Block } from '../../utils/Block';
import template from './button.hbs?raw';

export type ButtonProps = {
    id?: string;
    text: string;
    className?: string;
    type?: string;
    light?: boolean;
};

export class Button extends Block {
    constructor({ id, className, type = 'button', text, light }: ButtonProps) {
        super({
            text,
            attr: {
                ...insertToObject('id', id),
                type,
                class: `button ${className} ${light ? 'button_light' : ''}`
            }
        });
    }

    override render() {
        return template;
    }
}

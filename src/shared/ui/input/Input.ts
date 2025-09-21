import { Block, insertToObject } from '../../utils';
import template from './input.hbs?raw';

export type InputProps = {
    id: string;
    type: string;
    name: string;
    label?: string;
    className?: string;
    error?: string;
};

export class Input extends Block {
    constructor({ id, type, name, label, className, error }: InputProps) {
        super({
            id,
            type,
            name,
            ...insertToObject('label', label),
            ...insertToObject('className', className),
            ...insertToObject('error', error)
        });
    }

    override render() {
        // console.log(template);
        return template;
    }
}

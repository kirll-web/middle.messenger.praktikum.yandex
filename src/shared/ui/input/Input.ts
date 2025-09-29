import { Block, insertToObject } from '../../utils';
import template from './Input.hbs?raw';

export type InputProps = {
    id: string;
    type: string;
    name: string;
    value?: string;
    className?: string;
    disabled?: boolean;
    onBlur?: (event: FocusEvent) => void;
    onChange?: (event: Event) => void;
};

export class Input extends Block {
    constructor({ id, type, name, className, disabled, value, onBlur, onChange }: InputProps) {
        super({
            id,
            type,
            name,
            ...insertToObject('className', className),
            ...insertToObject('value', value),
            ...insertToObject('disabled', disabled),
            events: {
                ...insertToObject('blur', onBlur),
                ...insertToObject('change', (event: Event) => {
                    onChange?.(event);
                })
            }
        });
    }

    override render() {
        return template;
    }
}

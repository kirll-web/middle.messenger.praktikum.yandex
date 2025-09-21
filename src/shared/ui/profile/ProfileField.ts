import { Block, insertToObject } from '../../utils';
import template from './profile-field.hbs?raw';

export type ProfileFieldProps = {
    id: string;
    type: string;
    name: string;
    label: string;
    value?: string;
    className?: string;
    error?: string;
};

export class ProfileField extends Block {
    constructor({ id, type, name, label, className, error, value }: ProfileFieldProps) {
        const props = {
            id,
            type,
            name,
            value,
            ...insertToObject('label', label),
            ...insertToObject('className', className),
            ...insertToObject('error', error)
        };

        console.log(props);
        super(props);
    }

    override render() {
        return template;
    }
}

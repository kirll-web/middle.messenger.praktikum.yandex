import { Block } from '@shared/utils';

import { Button } from '../button/Button';
import { FormInput } from '../FormInput/FormInput';
import { insertToObject } from './../../utils/insertToObject';
import template from './Form.hbs?raw';

export type FormProps = {
    title: string;
    className?: string;
    inputs: FormInput[];
    buttons: Button[];
    onSubmit(event: SubmitEvent): void;
};

export class Form extends Block {
    constructor({ title, className = '', inputs, buttons, onSubmit }: FormProps) {
        super({
            title,
            inputs: inputs,
            buttons: buttons,
            attr: {
                ...insertToObject('class', `form ${className}`)
            },
            events: {
                submit: onSubmit
            }
        });
    }

    override render() {
        return template;
    }
}

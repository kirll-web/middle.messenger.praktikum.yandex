import { Block } from '@shared/utils';
import { Button, ButtonProps } from '../button/Button';
import { Input, InputProps } from '../input/Input';
import { insertToObject } from './../../utils/insertToObject';
import template from './Form.hbs?raw';

export type FormProps = {
    title: string;
    className?: string;
    inputs: InputProps[];
    buttons: ButtonProps[];
};

export class Form extends Block {
    constructor({ title, className = '', inputs, buttons }: FormProps) {
        super({
            title,
            inputs: inputs.map((input) => new Input(input)),
            buttons: buttons.map((button) => new Button(button)),
            attr: {
                ...insertToObject('class', className)
            }
        });
    }

    override render() {
        return template;
    }
}

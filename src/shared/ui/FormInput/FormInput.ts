import { Block } from '../../utils';
import { Input } from '../input/Input';
import template from './FormInput.hbs?raw';

export type FormInputProps = {
    id: string;
    type: string;
    name: string;
    label?: string;
    className?: string;
    error?: string;
    onBlur?: (event: FocusEvent) => void;
    onChange?: (event: Event) => void;
    onValidate: (value: string) => boolean;
};

export type PrivateFormInputProps = {
    Input: Input;
};

export class FormInput extends Block<Omit<FormInputProps, 'id' | 'type' | 'name'> & PrivateFormInputProps> {
    private value: string = '';
    private inputError: string | undefined;

    constructor({ id, type, name, label, className, error, onValidate, onChange }: FormInputProps) {
        super({
            label,
            className: ` ${className}`,
            onValidate,
            Input: new Input({
                id,
                type,
                name,
                className: 'form-input',
                onBlur: (event) => {
                    const input = event.target as HTMLInputElement;

                    this.validate(input.value);
                },
                onChange: (event) => {
                    onChange?.(event);
                    const input = event.target as HTMLInputElement;
                    this.value = input.value;
                }
            })
        });

        this.inputError = error;
    }

    public isValid = (): boolean => {
        return this.validate(this.value);
    };

    private validate = (value: string): boolean => {
        const valid = this.props.onValidate(value);
        if (valid) {
            this.setProps({ error: undefined });
            return true;
        }
        this.setProps({ error: this.inputError });
        return false;
    };

    override render() {
        return template;
    }
}

import { Block } from '../../utils';
import { Input } from '../input/Input';
import template from './FormInput.hbs?raw';

export type FormInputProps<T extends string | File = string> = {
    id: string;
    type: string;
    name: string;
    label?: string;
    className?: string;
    error?: string;
    onBlur?: (event: FocusEvent) => void;
    onChange?: (event: Event) => void;
    onValidate: (value: T) => boolean;
};

export type PrivateFormInputProps = {
    Input: Input;
};

export class FormInput<T extends string | File = string> extends Block<
    Omit<FormInputProps<T>, 'id' | 'type' | 'name'> & PrivateFormInputProps
> {
    private value?: T;
    private inputError: string | undefined;

    constructor({ id, type, name, label, className, error, onValidate, onChange }: FormInputProps<T>) {
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

                    this.validate(input.value as T);
                },
                onChange: (event) => {
                    onChange?.(event);
                    const input = event.target as HTMLInputElement;
                    this.value = input.value as T;
                }
            })
        });

        this.inputError = error;
    }

    public isValid = (): boolean => {
        return this.validate(this.value as T);
    };

    private validate = (value: T): boolean => {
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

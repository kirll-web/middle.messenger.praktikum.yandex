import { Block } from '../../utils';
import { Input } from '../input/Input';
import template from './ProfileField.hbs?raw';

export type ProfileFieldProps = {
    id: string;
    type: string;
    name: string;
    label: string;
    disabled?: boolean;
    value?: string;
    className?: string;
    error?: string;
    onChange?: (event: Event) => void;
    onValidate?: (value: string) => boolean;
};

type Props = Omit<ProfileFieldProps, 'id' | 'type' | 'name' | 'id' | 'type' | 'name'> & {
    Input: Input;
};

export class ProfileField extends Block<Props> {
    private value: string = '';
    private inputError: string | undefined;

    constructor({
        id,
        type,
        name,
        label,
        className,
        error,
        value,
        disabled = false,
        onValidate,
        onChange
    }: ProfileFieldProps) {
        const props: Props = {
            Input: new Input({
                id,
                type,
                name,
                className: 'profile-field__input',
                value,
                disabled,
                onBlur: (event) => {
                    const input = event.target as HTMLInputElement;

                    this.validate(input.value);
                },
                onChange: (event) => {
                    onChange?.(event);
                    const input = event.target as HTMLInputElement;
                    this.value = input.value;
                }
            }),
            onValidate,
            label,
            className: className
        };

        super(props);
        this.inputError = error;
        this.value = value ?? '';
    }

    public isValid = (): boolean => {
        return this.validate(this.value);
    };

    private validate = (value: string): boolean => {
        const onValidate = this.props.onValidate;

        if (!onValidate) {
            return true;
        }

        const valid = onValidate(value);

        if (valid) {
            console.log('valid', value);
            this.setProps({ error: undefined });
            return true;
        }
        console.log('not valid', value);
        this.setProps({ error: this.inputError });
        return false;
    };

    override render() {
        return template;
    }
}

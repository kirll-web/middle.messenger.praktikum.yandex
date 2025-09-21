import { Validator } from '@shared/lib';
import { Button, FormInput, Navbar } from '@shared/ui';
import { Form } from '@shared/ui/form/Form';
import { Block } from '@shared/utils';

import template from '../template/auth.hbs?raw';

export type AuthPageProps = {
    Navbar: Navbar;
};

export class AuthPage extends Block {
    inputs: FormInput[];

    constructor({ Navbar }: AuthPageProps) {
        const inputs: FormInput[] = [
            new FormInput({
                id: 'login',
                type: 'email',
                label: 'Логин',
                name: 'login',
                error: 'Неправильный логин',
                onValidate: (value: string) => {
                    return Validator.required(value.trim());
                }
            }),

            new FormInput({
                id: 'password',
                type: 'password',
                label: 'Пароль',
                name: 'password',
                error: 'Неправильный пароль',
                onValidate: (value: string) => {
                    return Validator.required(value.trim());
                }
            })
        ];
        const initProps: {
            Form: Form;
        } & AuthPageProps = {
            Form: new Form({
                title: 'Вход',
                className: 'form_auth',
                inputs,
                buttons: [
                    new Button({ id: 'loginBtn', text: 'Войти', className: 'form-button', type: 'submit' }),
                    new Button({
                        id: 'registrationBtn',
                        text: 'Зарегистрироваться',
                        className: 'button_light form-button_light form-button_registration',
                        type: 'submit'
                    })
                ],
                onSubmit: (event: SubmitEvent) => {
                    event.preventDefault();
                    this.inputs.forEach((input) => {
                        input.isValid();
                    });
                    const form = event.target as HTMLFormElement;
                    const formData = new FormData(form);

                    const values = Object.fromEntries(formData.entries());

                    console.log(values);
                }
            }),
            Navbar
        };
        super(initProps);
        this.inputs = inputs;
    }

    override render(): string {
        return template;
    }
}

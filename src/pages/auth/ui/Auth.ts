import { RoutePath, Validator } from '@shared/lib';
import { Button, Form, FormInput, Link, Navbar } from '@shared/ui';
import { Block } from '@shared/utils';

import template from '../template/auth.hbs?raw';

export type AuthPageProps = {
    navigate: (route: RoutePath) => void;
    Navbar: Navbar;
};

export class AuthPage extends Block {
    inputs: FormInput[];

    constructor({ Navbar, navigate }: AuthPageProps) {
        const inputs: FormInput[] = [
            new FormInput({
                id: 'login',
                type: 'text',
                label: 'Логин',
                name: 'login',
                error: 'Неправильный логин',
                onValidate: (value: string) => {
                    return Validator.validateLogin(value.trim());
                }
            }),

            new FormInput({
                id: 'password',
                type: 'password',
                label: 'Пароль',
                name: 'password',
                error: 'Неправильный пароль',
                onValidate: (value: string) => {
                    return Validator.validatePassword(value.trim());
                }
            })
        ];
        const initProps: {
            Form: Form;
        } & Omit<AuthPageProps, 'navigate'> = {
            Form: new Form({
                title: 'Вход',
                className: 'form_auth',
                inputs,
                buttons: [
                    new Button({ id: 'loginBtn', text: 'Войти', className: 'form-button', type: 'submit' }),
                    new Link({
                        id: 'registrationLink',
                        text: 'Зарегистрироваться',
                        className: 'form-link',
                        onClick: () => {
                            navigate(RoutePath.Registration);
                        }
                    })
                ],
                onSubmit: (event: SubmitEvent) => {
                    event.preventDefault();
                    const valid = this.inputs
                        .map((input) => input.isValid())
                        .some((inputValid) => inputValid === false);
                    console.log(valid);
                    if (!valid) {
                        return;
                    }
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

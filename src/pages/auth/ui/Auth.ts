import { getUser } from '@entities/user';
import { RoutePath, Validator } from '@shared/lib';
import { Button, Form, FormInput, Link, Navbar } from '@shared/ui';
import { Block, Router } from '@shared/utils';

import { fetchAuthData } from '../api';
import { AuthData } from '../model';
import template from '../template/auth.hbs?raw';

export type AuthPageProps = {
    navigate: (route: RoutePath) => void;
    Navbar: Navbar;
};

export class AuthPage extends Block {
    inputs: FormInput[];
    private router: Router;

    constructor() {
        getUser().then((data) => {
            if (data) {
                new Router().go(RoutePath.Chat);
            }
        });
        const inputs: FormInput<string>[] = [
            new FormInput<string>({
                id: 'login',
                type: 'text',
                label: 'Логин',
                name: 'login',
                error: 'Неправильный логин',
                onValidate: (value: string) => {
                    return Validator.validateLogin(value.trim());
                }
            }),

            new FormInput<string>({
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
        } = {
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
                            this.router.go(RoutePath.Registration);
                        }
                    })
                ],
                onSubmit: (event: SubmitEvent) => {
                    event.preventDefault();
                    const valid = this.inputs
                        .map((input) => input.isValid())
                        .every((inputValid) => inputValid === true);

                    if (!valid) {
                        return;
                    }

                    const form = event.target as HTMLFormElement;
                    const formData = new FormData(form);

                    const values = Object.fromEntries(formData.entries()) as AuthData;

                    fetchAuthData(values)
                        .then(() => this.router.go(RoutePath.Chat))
                        .catch((err) => console.log(err));
                }
            })
        };
        super(initProps);
        this.inputs = inputs;
        this.router = new Router();
    }

    override render(): string {
        return template;
    }
}

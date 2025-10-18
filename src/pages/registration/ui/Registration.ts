import { getUser } from '@entities/user';
import { RoutePath, Validator } from '@shared/lib';
import { Button, FormInput, Link } from '@shared/ui';
import { Form } from '@shared/ui/form/Form';
import { Block, Router } from '@shared/utils';

import { fetchRegistrationData } from '../api';
import { RegistrationData } from '../model';
import template from '../template/registration.hbs?raw';

import './Registration.scss';

export class RegistrationPage extends Block {
    inputs: FormInput[];
    password: string = '';
    private router: Router;

    constructor() {
        const inputs = [
            new FormInput({
                id: 'email',
                type: 'emsail',
                label: 'Почта',
                name: 'email',
                error: 'Неверная почта',
                onValidate: (value: string) => Validator.validateEmail(value)
            }),
            new FormInput({
                id: 'login',
                type: 'text',
                label: 'Логин',
                name: 'login',
                error: 'Неправильный логин',
                onValidate: (value: string) => Validator.validateLogin(value)
            }),
            new FormInput({
                id: 'first_name',
                type: 'text',
                label: 'Имя',
                name: 'first_name',
                error: 'Неправильное имя',
                onValidate: (value: string) => Validator.validateName(value)
            }),
            new FormInput({
                id: 'second_name',
                type: 'text',
                label: 'Фамилия',
                name: 'second_name',
                error: 'Неправильная фамилия',
                onValidate: (value: string) => Validator.validateName(value)
            }),
            new FormInput({
                id: 'phone',
                type: 'phone',
                label: 'Телефон',
                name: 'phone',
                error: 'Неверный телефон',
                onValidate: (value: string) => Validator.validatePhone(value)
            }),
            new FormInput({
                id: 'password',
                type: 'password',
                label: 'Пароль',
                name: 'password',
                error: 'Неправильный пароль',
                onValidate: (value: string) => Validator.validatePassword(value),
                onChange: (event) => {
                    const input = event.target as HTMLInputElement;
                    this.password = input.value;
                }
            }),
            new FormInput({
                id: 'repeatPassword',
                type: 'password',
                label: 'Пароль (ещё раз)',
                name: 'repeatPassword',
                error: 'Пароли не совпадают',
                onValidate: (value: string) => Validator.equalsPassword(value, this.password)
            })
        ];

        const buttons = [
            new Button({
                id: 'registrationBtn',
                text: 'Зарегистрироваться',
                className: 'form-button_registration form-button',
                type: 'submit'
            }),
            new Link({
                id: 'authLink',
                text: 'Войти',
                className: 'form-link',
                onClick: () => {
                    this.router.go(RoutePath.Auth);
                }
            })
        ];

        const initProps: {
            Form: Form;
        } = {
            Form: new Form({
                title: 'Регистрация',
                className: 'form_registration',
                inputs,
                buttons,
                onSubmit: (event: SubmitEvent) => {
                    event.preventDefault();

                    const isFormValid = inputs.every((input) => input.isValid());
                    if (!isFormValid) {
                        return;
                    }

                    const form = event.target as HTMLFormElement;
                    const formData = new FormData(form);

                    const values = Object.fromEntries(formData.entries()) as RegistrationData;
                    fetchRegistrationData({
                        first_name: values.first_name,
                        second_name: values.second_name,
                        login: values.login,
                        email: values.email,
                        password: values.password,
                        phone: values.phone
                    })
                        .then(() => getUser().then(() => new Router().go(RoutePath.Chat)))
                        .catch((err) => {
                            console.log(err);
                        });
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

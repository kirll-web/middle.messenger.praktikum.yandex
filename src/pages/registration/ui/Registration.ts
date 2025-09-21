import { Navbar } from '@shared/ui';
import { Form } from '@shared/ui/form/Form';
import { Block } from '@shared/utils';
import template from '../template/registration.hbs?raw';
import './Registration.scss';

export type RegistrationPageProps = {
    Navbar: Navbar;
};

export class RegistrationPage extends Block {
    constructor({ Navbar }: RegistrationPageProps) {
        const initProps: {
            Form: Form;
        } & RegistrationPageProps = {
            Form: new Form({
                title: 'Регистрация',
                className: 'form_registration',
                inputs: [
                    { id: 'email', type: 'email', label: 'Почта', name: 'email' },
                    { id: 'login', type: 'text', label: 'Логин', name: 'login', error: 'Неправильный логин' },
                    { id: 'first_name', type: 'text', label: 'Имя', name: 'first_name' },
                    { id: 'second_name', type: 'text', label: 'Фамилия', name: 'second_name' },
                    { id: 'phone', type: 'phone', label: 'Телефон', name: 'phone' },
                    {
                        id: 'password',
                        type: 'password',
                        label: 'Пароль',
                        name: 'password',
                        error: 'Неправильный пароль'
                    },
                    { id: 'repeatPassword', type: 'password', label: 'Пароль (ещё раз)', name: 'repeatPassword' }
                ],
                buttons: [
                    {
                        id: 'registrationBtn',
                        text: 'Зарегистрироваться',
                        className: 'form-button_registration form-button',
                        type: 'submit'
                    },
                    { id: 'loginBtn', text: 'Войти', light: true, className: 'form-button_light', type: 'submit' }
                ]
            }),
            Navbar
        };

        super(initProps);
    }

    override render(): string {
        return template;
    }
}

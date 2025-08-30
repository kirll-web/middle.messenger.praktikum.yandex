import Handlebars from 'handlebars';
import RegistrationTemplate from './registration.hbs?raw';

export const registrationRender = () =>
    Handlebars.compile(RegistrationTemplate)({
        inputs: [
            { id: 'email', type: 'email', label: 'Почта', name: 'email' },
            {
                id: 'login',
                type: 'text',
                label: 'Логин',
                name: 'login',
                error: 'Неправильный логин'
            },
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
            {
                id: 'repeatPassword',
                type: 'password',
                label: 'Пароль (ещё раз)',
                name: 'repeatPassword'
            }
        ],
        buttons: [
            {
                id: 'registrationBtn',
                text: 'Зарегистрироваться',
                light: true,
                className: 'form-button_registration form-button'
            },
            { id: 'loginBtn', text: 'Войти', className: 'button_light form-button_light' }
        ]
    });

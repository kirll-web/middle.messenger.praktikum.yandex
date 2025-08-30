import Handlebars from 'handlebars';
import AuthTemplate from './auth.hbs?raw';

export const authRender = () =>
    Handlebars.compile(AuthTemplate)({
        inputs: [
            { id: 'login', type: 'email', label: 'Логин', name: 'login' },
            { id: 'password', type: 'password', label: 'Пароль', name: 'password' }
        ],
        buttons: [
            { id: 'loginBtn', text: 'Войти', className: 'form-button' },
            {
                id: 'registrationBtn',
                text: 'Зарегистрироваться',
                className: 'button_light form-button_light form-button_registration'
            }
        ]
    });

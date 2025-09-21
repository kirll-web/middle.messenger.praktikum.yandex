import { Navbar } from '@shared/ui';
import { Form } from '@shared/ui/form/Form';
import { Block } from '@shared/utils';
import template from '../template/auth.hbs?raw';

// export const authRender = () =>
//     Handlebars.compile(AuthTemplate)({
//         inputs: [
//             { id: 'login', type: 'email', label: 'Логин', name: 'login' },
//             { id: 'password', type: 'password', label: 'Пароль', name: 'password' }
//         ],
//         buttons: [
//             { id: 'loginBtn', text: 'Войти', className: 'form-button', type: 'submit' },
//             {
//                 id: 'registrationBtn',
//                 text: 'Зарегистрироваться',
//                 className: 'button_light form-button_light form-button_registration',
//                 type: 'submit'
//             }
//         ]
//     });


export type AuthPageProps = {
    Navbar: Navbar;
};

export class AuthPage extends Block {
    constructor({ Navbar }: AuthPageProps) {
        const initProps: {
            Form: Form;
        } & AuthPageProps = {
            Form: new Form({
                title: 'Вход',
                className: 'form_auth',
                inputs: [
                    { id: 'login', type: 'email', label: 'Логин', name: 'login' },
                    { id: 'password', type: 'password', label: 'Пароль', name: 'password' }
                ],
                buttons: [
                    { id: 'loginBtn', text: 'Войти', className: 'form-button', type: 'submit' },
                    {
                        id: 'registrationBtn',
                        text: 'Зарегистрироваться',
                        className: 'button_light form-button_light form-button_registration',
                        type: 'submit'
                    }
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

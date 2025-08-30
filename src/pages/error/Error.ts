import Handlebars from 'handlebars';
import ErrorTemplate from './error.hbs?raw';

export const error404Render = () =>
    Handlebars.compile(ErrorTemplate)({
        title: '404',
        description: 'Не туда попали',
        button: {
            id: 'back',
            text: 'Назад к чатам',
            className: 'button_light'
        }
    });

export const error500Render = () =>
    Handlebars.compile(ErrorTemplate)({
        title: '500',
        description: 'Мы уже фиксим',
        button: {
            id: 'back',
            text: 'Назад к чатам',
            className: 'button_light'
        }
    });

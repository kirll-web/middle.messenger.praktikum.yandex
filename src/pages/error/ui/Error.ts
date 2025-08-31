import Handlebars from 'handlebars';
import ErrorTemplate from '../template/error.hbs?raw';
import './Error.scss';

export const error404Render = () =>
    Handlebars.compile(ErrorTemplate)({
        title: '404',
        description: 'Не туда попали',
        link: {
            id: 'back',
            text: 'Назад к чатам',
            className: 'button_light',
            href: '#'
        }
    });

export const error500Render = () =>
    Handlebars.compile(ErrorTemplate)({
        title: '500',
        description: 'Мы уже фиксим',
        link: {
            id: 'back',
            text: 'Назад к чатам',
            className: 'button_light',
            href: '#'
        }
    });

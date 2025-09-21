import { Link } from '@shared/ui/link';
import { Block } from '@shared/utils';

import template from '../template/error.hbs?raw';
import { Navbar } from './../../../shared/ui/nav/Navbar';
import './Error.scss';

// export const error404Render = () =>
//     Handlebars.compile(ErrorTemplate)({
//         title: '404',
//         description: 'Не туда попали',
//         link: {
//             id: 'back',
//             text: 'Назад к чатам',
//             className: 'button_light',
//             href: '#'
//         }
//     });

// export const error500Render = () =>
//     Handlebars.compile(ErrorTemplate)({
//         title: '500',
//         description: 'Мы уже фиксим',
//         link: {
//             id: 'back',
//             text: 'Назад к чатам',
//             className: 'button_light',
//             href: '#'
//         }
//     });

export type ErrorPageProps = {
    title: string;
    description: string;
    LinkBack: Link;
    Navbar: Navbar;
};

//todo дописать атррибуты
export class ErrorPage extends Block {
    constructor({ title, description, LinkBack, Navbar }: ErrorPageProps) {
        super({ title, description, LinkBack, Navbar });
    }

    override render() {
        return template;
    }
}

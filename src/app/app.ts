import Handlebars from 'handlebars';

import { getUser } from '@entities/user';
import { ProfilePage } from '@pages/profile';
import { RoutePath } from '@shared/lib';
import { Router } from '@shared/utils';

import { AuthPage, ChatPage, RegistrationPage } from '../pages';

Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
});

class App {
    appElement: HTMLDivElement;

    router: Router;

    constructor() {
        this.router = new Router('#app');
        this.router.use(RoutePath.Auth, AuthPage);
        this.router.use(RoutePath.Registration, RegistrationPage);
        this.router.use(RoutePath.Profile, ProfilePage);
        this.router.use(RoutePath.Chat, ChatPage);
        this.router.start();
        const appElement = document.getElementById('app') as HTMLDivElement;
        if (!appElement) {
            throw new Error('App is not found');
        }
        this.appElement = appElement;

        getUser()
            .then((data) => {
                if (!data) {
                    new Router().go(RoutePath.Auth);
                    return;
                }

                if (
                    this.router.currentRoutePath === RoutePath.Auth ||
                    this.router.currentRoutePath === RoutePath.Registration
                ) {
                    new Router().go(RoutePath.Chat);
                }
            })
            .catch(() => new Router().go(RoutePath.Auth)); 
    }

    // render() {
    //     switch (this.state.currentPage) {
    //         case RoutePath.Error500: {
    //             this.appElement.replaceChildren();
    //             render(
    //                 '#app',
    //                 new ErrorPage({
    //                     title: '500',
    //                     description: 'Не туда попали',
    //                     LinkBack: new Link({
    //                         text: 'Назад к чатам',
    //                         className: '',
    //                         href: '#'
    //                     }),
    //                     Navbar: this.navbar
    //                 })
    //             );
    //             break;
    //         }

    //         default: {
    //             this.appElement.replaceChildren();
    //             render(
    //                 '#app',
    //                 new ErrorPage({
    //                     title: '404',
    //                     description: 'Не туда попали',
    //                     LinkBack: new Link({
    //                         text: 'Назад к чатам',
    //                         className: '',
    //                         href: '#'
    //                     }),
    //                     Navbar: this.navbar
    //                 })
    //             );
    //         }
    //     }
    // }
}

export { App };

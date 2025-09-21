import { ProfilePage } from '@pages/profile';
import { Link } from '@shared/ui/link';
import { render } from '@shared/utils/renderDom';
import Handlebars from 'handlebars';
import { AuthPage, ChatListPage, ChatPage, ErrorPage, RegistrationPage } from '../pages';
import { Navbar, registrComponents } from '../shared/ui';
import { RoutePath } from './consts';

Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
});

class App {
    state: {
        currentPage: RoutePath;
        questions: any[];
        answers: any[];
    };

    appElement: HTMLDivElement;

    navbar: Navbar;

    constructor() {
        registrComponents();
        const navbar = new Navbar({
            links: [
                {
                    text: 'Вход',
                    href: '#login',
                    onClick: () => {
                        console.log('this.navbar onclick');
                        this.state.currentPage = RoutePath.Auth;
                        this.render();
                    }
                },
                {
                    text: 'Регистрация',
                    href: '#registration',
                    onClick: () => {
                        console.log('this.navbar onclick');
                        this.state.currentPage = RoutePath.Registration;
                        this.render();
                    }
                },
                {
                    text: 'Профиль',
                    href: '#profile',
                    onClick: () => {
                        console.log('this.navbar onclick');
                        this.state.currentPage = RoutePath.Profile;
                        this.render();
                    }
                },
                {
                    text: 'Редактировать профиль',
                    href: '#editProfile',
                    onClick: () => {
                        console.log('this.navbar onclick');
                        this.state.currentPage = RoutePath.EditProfile;
                        this.render();
                    }
                },
                {
                    text: 'Редактировать пароль',
                    href: '#changePassword',
                    onClick: () => {
                        console.log('this.navbar onclick');
                        this.state.currentPage = RoutePath.ChangePassword;
                        this.render();
                    }
                },
                {
                    text: 'Список чатов',
                    href: '#chatLists',
                    onClick: () => {
                        console.log('this.navbar onclick');
                        this.state.currentPage = RoutePath.ChatsList;
                        this.render();
                    }
                },
                {
                    text: 'Чат',
                    href: '#chat',
                    onClick: () => {
                        console.log('this.navbar onclick');
                        this.state.currentPage = RoutePath.Chat;
                        this.render();
                    }
                }
            ]
        });
        this.navbar = navbar;

        this.state = {
            currentPage: RoutePath.Chat,
            questions: [],
            answers: []
        };
        const appElement = document.getElementById('app') as HTMLDivElement;
        if (!appElement) {
            throw new Error('App is not found');
        }
        this.appElement = appElement;
        document.addEventListener('click', this.handleNavigation.bind(this));
    }

    private handleNavigation(event: MouseEvent | null) {
        if (!event) {
            return;
        }

        const target = event.target as HTMLElement;
        if (target.classList.contains('navbar__link')) {
            event.preventDefault();
            const href = target.getAttribute('href')?.substring(1);
            if (href && Object.values(RoutePath).includes(href as RoutePath)) {
                this.state.currentPage = href as RoutePath;
                this.render();
            }
        }
    }

    renderPage(page: () => string) {
        this.appElement.replaceChildren();
        this.appElement.insertAdjacentHTML('afterbegin', page());
    }

    render() {
        switch (this.state.currentPage) {
            case RoutePath.Auth: {
                this.appElement.replaceChildren();
                render('#app', new AuthPage({ Navbar: this.navbar }));
                break;
            }
            case RoutePath.Registration: {
                this.appElement.replaceChildren();
                render('#app', new RegistrationPage({ Navbar: this.navbar }));
                break;
            }

            case RoutePath.Error500: {
                this.appElement.replaceChildren();
                render(
                    '#app',
                    new ErrorPage({
                        title: '500',
                        description: 'Не туда попали',
                        LinkBack: new Link({
                            text: 'Назад к чатам',
                            className: '',
                            href: '#'
                        }),
                        Navbar: this.navbar
                    })
                );
                break;
            }

            case RoutePath.Profile: {
                this.appElement.replaceChildren();

                render(
                    '#app',
                    new ProfilePage({
                        type: 'view',
                        Navbar: this.navbar
                    })
                );

                break;
            }

            case RoutePath.EditProfile: {
                this.appElement.replaceChildren();

                render(
                    '#app',
                    new ProfilePage({
                        type: 'edit',
                        Navbar: this.navbar
                    })
                );

                break;
            }

            case RoutePath.ChangePassword: {
                this.appElement.replaceChildren();

                render(
                    '#app',
                    new ProfilePage({
                        type: 'changePassword',
                        Navbar: this.navbar
                    })
                );
                break;
            }
            case RoutePath.Chat: {
                this.appElement.replaceChildren();

                render('#app', new ChatPage({}));
                break;
            }
            case RoutePath.ChatsList: {
                this.appElement.replaceChildren();

                render(
                    '#app',
                    new ChatListPage({
                        Navbar: this.navbar
                    })
                );
                break;
            }

            default: {
                this.appElement.replaceChildren();
                render(
                    '#app',
                    new ErrorPage({
                        title: '404',
                        description: 'Не туда попали',
                        LinkBack: new Link({
                            text: 'Назад к чатам',
                            className: '',
                            href: '#'
                        }),
                        Navbar: this.navbar
                    })
                );
            }
        }
    }
}

export { App };

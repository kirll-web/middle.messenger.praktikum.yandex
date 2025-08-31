import Handlebars from 'handlebars';
import {
    authRender,
    chatRender,
    chatsListRender,
    error404Render,
    error500Render,
    profileChangePasswordRender,
    profileEditRender,
    profileRender,
    registrationRender
} from '../pages';
import { registrComponents } from '../shared/ui';
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

    constructor() {
        registrComponents();
        this.state = {
            currentPage: RoutePath.Auth,
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
            console.log(href);
            if (href && Object.values(RoutePath).includes(href as RoutePath)) {
                console.log(href);
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
                this.renderPage(authRender);
                break;
            }
            case RoutePath.Registration: {
                this.renderPage(registrationRender);
                break;
            }

            case RoutePath.Error500: {
                this.renderPage(error500Render);
                break;
            }

            case RoutePath.Profile: {
                this.renderPage(profileRender);
                break;
            }

            case RoutePath.EditProfile: {
                this.renderPage(profileEditRender);
                break;
            }

            case RoutePath.ChangePassword: {
                this.renderPage(profileChangePasswordRender);
                break;
            }
            case RoutePath.Chat: {
                this.renderPage(chatRender);
                break;
            }
            case RoutePath.ChatsList: {
                this.renderPage(chatsListRender);
                break;
            }

            default: {
                this.renderPage(error404Render);
            }
        }
    }
}

export { App };

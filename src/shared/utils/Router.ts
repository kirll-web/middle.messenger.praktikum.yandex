import { BlockConstructor } from './Block';
import { Route, RouteProps } from './Route';

export class Router {
    private routes: Route[] = [];
    history = window.history;
    private _currentRoute?: Route;
    _rootQuery?: string;
    protected static __instance?: Router;

    currentRoutePath?: string;

    constructor(rootQuery?: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.history = window.history;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: BlockConstructor) {
        if (!this._rootQuery) {
            throw new Error('rootQuery must be string');
        }

        const routeProps: RouteProps = { root: this._rootQuery };
        const route = new Route(pathname, block, routeProps);
        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = (() => {
            this._onRoute(window.location.pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        this.currentRoutePath = pathname;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname));
    }

    public reset() {
        Router.__instance = undefined;
    }
}

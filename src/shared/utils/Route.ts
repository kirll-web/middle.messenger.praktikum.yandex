import { Block, BlockConstructor } from './Block';
import { render } from './renderDom';

export type RouteProps = {
    root: string;
};

export class Route {
    _pathname: string;
    _blockClass: BlockConstructor;
    _block: Block | null;
    _props: RouteProps;

    constructor(pathname: string, view: BlockConstructor, props: RouteProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this.render();
        }
    }

    leave() {}

    match(pathname: string) {
        return pathname === this._pathname;
    }

    render() {
        this._block = new this._blockClass({});
        render(this._props.root as string, this._block);
    }
}

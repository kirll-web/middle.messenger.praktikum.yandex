import Handlebars from 'handlebars';
import { v1 as createId } from 'uuid';

import { EventBus, EventCallback } from './EventBus';

type DomEvents = {
    [K in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[K]) => void;
};

export type BaseProps = {
    events?: DomEvents;
    settings?: {
        withId?: boolean;
    };
    attr?: Record<string, string>;
};

type Meta = {
    props: Record<string, unknown>;
};

type Props = {
    [key: string]: unknown;
} & BaseProps;

type WithId<P extends Props> = Omit<P, '_id'> & { _id: string };

export class Block<P extends Props = Props> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render'
    };

    _element: HTMLElement | null = null;
    _meta: Meta;
    protected _id: string = createId();
    readonly id = this._id;
    props: WithId<P>;
    eventBus: () => EventBus;
    children: Record<string, Block>;
    lists: Record<string, unknown[]>;

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(propsBlock: Omit<P & BaseProps, '_id'> = {} as Omit<P & BaseProps, '_id'>) {
        const eventBus = new EventBus();
        const { children, props, lists } = this._getInitProps(propsBlock);

        this.children = children;

        this._meta = {
            props
        };
        const propsWithId: WithId<P> = {
            ...(props as Omit<P, '_id'>),
            _id: this._id
        };
        this.props = this._makeProxy(propsWithId);
        this.lists = this._makeProxy({ ...lists });

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _addEvents() {
        if (!this.props.events || !this._element) {
            return;
        }

        const events: DomEvents = this.props.events;

        for (const key in events) {
            const k = key as keyof DomEvents;
            const handler = events[k];
            if (handler) {
                this._element.addEventListener(k, handler as EventListener);
            }
        }
    }

    private _removeEvents() {
        if (!this.props.events || !this._element) {
            return;
        }

        const events: DomEvents = this.props.events;

        for (const key in events) {
            const k = key as keyof DomEvents;
            const handler = events[k];
            if (handler) {
                this._element.removeEventListener(k, handler as EventListener);
            }
        }
    }

    protected addAttributes(): void {
        if (!this.props || !this.props.attr) {
            return;
        }

        const { attr = {} } = this.props;

        Object.entries(attr).forEach(([key, value]) => {
            if (this._element) {
                this._element.setAttribute(key, value as string);
            }
        });
    }

    //private
    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) as EventCallback);
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    private _componentDidMount() {
        this.componentDidMount();
        Object.values(this.children).forEach((child) => {
            child.dispatchComponentDidMount();
        });
    }

    protected componentDidMount() {}

    public dispatchComponentDidMount() {
        this.eventBus?.().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps: P, newProps: P) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    protected componentDidUpdate(oldProps: P, newProps: P): boolean {
        if (!Object.keys(oldProps).length || !Object.keys(newProps).length) {
            return true;
        }

        for (const key in newProps) {
            if (newProps[key] !== oldProps[key]) {
                return true;
            }
        }

        if (oldProps.events !== newProps.events) {
            return true;
        }

        for (const key in newProps.events) {
            const k = key as keyof DomEvents;
            if (newProps.events?.[k] !== oldProps.events?.[k]) {
                return true;
            }
        }

        return false;
    }

    public setProps = (nextProps: Partial<P & BaseProps>) => {
        if (!nextProps) {
            return;
        }

        const { children, props, lists } = this._getInitProps(nextProps);

        const oldProps = { ...this.props, ...this.children, ...this.lists };

        Object.assign(this.children, children);
        Object.assign(this.lists, lists);
        Object.assign(this.props, props);

        const newProps = { ...this.props, ...this.children, ...this.lists };

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, newProps);
    };

    public get element() {
        return this._element;
    }

    private _render() {
        this._removeEvents();
        const propsAndStubs: Record<string, unknown> = { ...this.props };
        const tmpId = Math.floor(100000 + Math.random() * 900000);

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        });

        Object.entries(this.lists).forEach(([key]) => {
            propsAndStubs[key] = `<div data-id="__l_${tmpId}"></div>`;
        });

        const fragment = this._createDocumentElement('template');
        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

        Object.values(this.children).forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            if (stub) {
                stub.replaceWith(child.getContent());
            }
        });

        Object.entries(this.lists).forEach(([, child]) => {
            const listCont = this._createDocumentElement('template');

            child.forEach((item) => {
                if (item instanceof Block) {
                    listCont.content.append(item.getContent());
                } else {
                    listCont.content.append(`${item}`);
                }
            });
            const stub = fragment.content.querySelector(`[data-id="__l_${tmpId}"]`);
            if (stub) {
                stub.replaceWith(listCont.content);
            }
        });

        const newElement = fragment.content.firstElementChild as HTMLElement;
        if (this._element && newElement) {
            this._element.replaceWith(newElement);
        }
        this._element = newElement;
        this._addEvents();
        this.addAttributes();
    }

    protected render(): string {
        return '';
    }

    public getContent() {
        if (!this._element) {
            throw new Error('Element is not created');
        }
        return this._element;
    }

    private _makeProxy<T extends Record<string, unknown>>(props: T): T {
        return new Proxy(props, {
            get: (target, prop: string | symbol) => {
                const value = target[prop as keyof T];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set: (target, prop: string | symbol, value: unknown) => {
                const oldTarget = { ...target };
                (target as Record<string, unknown>)[prop as string] = value; // приведение типа
                this.eventBus?.().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty: () => {
                throw new Error('No access');
            }
        });
    }

    private _createDocumentElement(tagName: string): HTMLTemplateElement {
        return document.createElement(tagName) as HTMLTemplateElement;
    }

    private _getInitProps(propsAndChildren: BaseProps): {
        children: Record<string, Block>;
        props: BaseProps;
        lists: Record<string, unknown[]>;
    } {
        const children: Record<string, Block> = {};
        const props: Record<string, unknown> = {};
        const lists: Record<string, unknown[]> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else if (Array.isArray(value)) {
                lists[key] = value;
            } else {
                props[key] = value;
            }
        });
        return { children, props, lists };
    }

    public compile(template: HTMLTemplateElement, props: BaseProps) {
        const propsAndStubs: Record<string, unknown> = { ...props };

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        });

        const fragment = this._createDocumentElement('template');
        fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

        Object.values(this.children).forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id="${child.id || 1}"]`);
            if (stub === null) {
                throw new Error('Stub not created');
            }
            stub.replaceWith(child.getContent());
        });

        return fragment.content;
    }

    public show() {
        const content = this.getContent();
        if (content) {
            content.style.display = 'block';
        }
    }

    public hide() {
        const content = this.getContent();
        if (content) {
            content.style.display = 'none';
        }
    }
}

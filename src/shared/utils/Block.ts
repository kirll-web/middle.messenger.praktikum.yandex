import Handlebars from 'handlebars';
import { v1 as createId } from 'uuid';
import { EventBus, EventCallback } from './EventBus';

interface PropsEvents {
    [key: string]: (...args: any[]) => unknown;
}

export type Props<T = unknown> = {
    [key: string]: T;
} & {
    events?: PropsEvents;
    settings?: {
        withId?: boolean;
    };
};

type Meta = {
    props: Record<string, unknown>;
};

export class Block {
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
    props: Props;
    eventBus: () => EventBus;
    children: Record<string, Block>;
    lists: Record<string, unknown[]>;

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(propsBlock: Props = {}) {
        const eventBus = new EventBus();
        const { children, props, lists } = this._getInitProps(propsBlock);

        this.children = children;

        this._meta = {
            props
        };
        this.props = this._makeProxy({ ...props, _id: this._id });
        this.lists = this._makeProxy({ ...lists });

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    //private
    private _addEvents() {
        console.log('addEvents', this.props.events);
        if (!this.props.events) {
            return;
        }

        const { events } = this.props;
        Object.keys(events).forEach((eventName) => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    private _removeEvents() {
        if (!this.props.events) {
            return;
        }

        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            this._element?.removeEventListener(eventName, events[eventName]);
        });
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

    private _componentDidUpdate(oldProps: Props, newProps: Props) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if (!Object.keys(oldProps).length || !Object.keys(newProps).length) {
            return true;
        }

        for (const key in newProps) {
            if (newProps[key] !== oldProps[key]) {
                // console.log(`Prop "${key}" изменился:`, oldProps[key], '→', newProps[key]);

                return true;
            }
        }

        if (oldProps.events !== newProps.events) {
            return true;
        }

        for (const key in newProps.events) {
            if (newProps.events?.[key] !== oldProps.events?.[key]) {
                return true;
            }
        }

        return false;
    }

    public setProps = (nextProps: Props) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
        console.log(this.props);
    };

    public get element() {
        return this._element;
    }

    private _render() {
        const propsAndStubs = { ...this.props };
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

        // console.log(this.lists.links);
        Object.entries(this.lists).forEach(([, child]) => {
            const listCont = this._createDocumentElement('template');
            // console.log(child);
            child.forEach((item) => {
                // console.log(item);
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

    private _makeProxy<T>(props: Props): Record<string, T> {
        const self = this;

        return new Proxy(props, {
            get(target: any, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: any, prop: string, value: any) {
                const oldTarget = { ...target };
                target[prop] = value;
                self.eventBus?.().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('No access');
            }
        });
    }

    private _createDocumentElement(tagName: string): HTMLTemplateElement {
        if (this.props.settings?.withId && this._id && this._element) {
            this._element.setAttribute('block-id', this._id);
        }

        return document.createElement(tagName) as HTMLTemplateElement;
    }

    private _getInitProps(propsAndChildren: Props): {
        children: Record<string, Block>;
        props: Props;
        lists: Record<string, unknown[]>;
    } {
        const children: Record<string, Block> = {};
        const props: Props = {};
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

    public compile(template: HTMLTemplateElement, props: Props) {
        const propsAndStubs = { ...props };

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

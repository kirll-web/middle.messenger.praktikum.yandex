// class EventBus {
//     constructor() {
//         this.listeners = {};
//     }

//     on(event, callback) {
//         if (!this.listeners[event]) {
//             this.listeners[event] = [];
//         }

//         this.listeners[event].push(callback);
//     }

//     off(event, callback) {
//         if (!this.listeners[event]) {
//             throw new Error(`Нет события: ${event}`);
//         }

//         this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
//     }

//     emit(event, ...args) {
//         if (!this.listeners[event]) {
//             throw new Error(`Нет события: ${event}`);
//         }

//         this.listeners[event].forEach(function (listener) {
//             listener(...args);
//         });
//     }
// }

// export class Block {
//     static EVENTS = {
//         INIT: 'init',
//         FLOW_CDM: 'flow:component-did-mount',
//         FLOW_CDU: 'flow:component-did-update',
//         FLOW_RENDER: 'flow:render'
//     };

//     _element = null;
//     _meta = null;
//     _eventBus = null;

//     /** JSDoc
//      * @param {string} tagName
//      * @param {Object} props
//      *
//      * @returns {void}
//      */
//     constructor(tagName = 'div', props = {}) {
//         const eventBus = new EventBus();
//         this._meta = {
//             tagName,
//             props
//         };

//         this.props = this._makePropsProxy(props);

//         this.eventBus = () => eventBus;

//         this._registerEvents(eventBus);
//         this.eventBus().emit(Block.EVENTS.INIT);
//     }

//     _registerEvents(eventBus) {
//         eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
//         eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
//         eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
//         eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
//     }

//     _createResources() {
//         const { tagName } = this._meta;
//         this._element = this._createDocumentElement(tagName);
//     }

//     init() {
//         this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
//     }

//     _componentDidMount() {
//         this.componentDidMount();
//     }

//     componentDidMount(oldProps) {}

//     dispatchComponentDidMount() {
//         this.eventBus().emit(Block.EVENTS.FLOW_CDM);
//     }

//     _componentDidUpdate(oldProps, newProps) {
//         const response = this.componentDidUpdate(oldProps, newProps);

//         if (!response) {
//             return;
//         }
//         this._render();
//     }

//     componentDidUpdate(oldProps, newProps) {
//         return true;
//     }

//     setProps = (nextProps) => {
//         if (!nextProps) {
//             return;
//         }

//         Object.assign(this.props, nextProps);
//     };

//     get element() {
//         return this._element;
//     }

//     _render() {
//         const block = this.render();
//         // Этот небезопасный метод для упрощения логики
//         // Используйте шаблонизатор из npm или напишите свой безопасный
//         // Нужно не в строку компилировать (или делать это правильно),
//         // либо сразу в DOM-элементы возвращать из compile DOM-ноду
//         this._element.innerHTML = block;
//     }

//     // Может переопределять пользователь, необязательно трогать
//     render() {}

//     getContent() {
//         return this.element;
//     }

//     _makePropsProxy(props) {
//         // Можно и так передать this
//         // Такой способ больше не применяется с приходом ES6+
//         const self = this;

//         return new Proxy(props, {
//             get(target, prop) {
//                 const value = target[prop];
//                 return typeof value === 'function' ? value.bind(target) : value;
//             },
//             set(target, prop, value) {
//                 const oldTarget = { ...target };
//                 target[prop] = value;

//                 self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
//                 return true;
//             },
//             deleteProperty() {
//                 throw new Error('Нет доступа');
//             }
//         });
//     }

//     _createDocumentElement(tagName) {
//         // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
//         return document.createElement(tagName);
//     }

//     show() {
//         if (!this._element) {
//             return;
//         }

//         this.getContent().style.display = 'block';
//     }

//     hide() {
//         if (!this._element) {
//             return;
//         }

//         this.getContent().style.display = 'none';
//     }
// }

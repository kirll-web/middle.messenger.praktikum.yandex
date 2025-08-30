import Handlebars from 'handlebars';
import ChatTemplate from './chat.hbs?raw';

export const chatRender = () => Handlebars.compile(ChatTemplate)({});

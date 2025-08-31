import Handlebars from 'handlebars';
import ChatTemplate from '../template/chat.hbs?raw';

export const chatRender = () => Handlebars.compile(ChatTemplate)({});

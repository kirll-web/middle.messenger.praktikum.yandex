import Handlebars from 'handlebars';
import ChatsListTemplate from './chats-list.hbs?raw';

export const chatsListRender = () => Handlebars.compile(ChatsListTemplate)({});

import Handlebars from 'handlebars';
import ChatsListTemplate from '../template/chats-list.hbs?raw';

export const chatsListRender = () => Handlebars.compile(ChatsListTemplate)({});

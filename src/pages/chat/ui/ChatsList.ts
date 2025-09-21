import { availableTypes } from '@pages/profile/model/consts';
import { Avatar, Link, Search } from '@shared/ui';
import { Block } from '@shared/utils';

import { avatarPlaceholderSrc, mockPicture } from '../../../assets';
import template from '../template/chats-list.hbs?raw';
import { ChatProps } from './Chat';
import { ChatDate } from './ChatDate';
import { ChatItem } from './ChatItem';
import { ChatMessage } from './ChatMessage';
import { ChatProfile } from './ChatProfile';

export type ChatListProps = {
    OnOpenChat(chatProps: ChatProps): void;
};

export class ChatList extends Block {
    constructor({ OnOpenChat }: ChatListProps) {
        const initProps: {
            ProfileLink: Link;
            Search: Search;
            chatItems: ChatItem[];
        } = {
            ProfileLink: new Link({
                id: 'profileLink',
                text: 'Профиль >',
                className: 'chat__profile-link'
            }),
            Search: new Search({ name: 'chat-search', placeholder: 'Поиск' }),
            chatItems: [
                new ChatItem({
                    name: 'Андрей',
                    lastMessage: 'Изображение',
                    time: '10:49',
                    messageCount: 2,
                    Avatar: new Avatar({
                        id: 'avatar',
                        name: 'avatar',
                        className: 'chat-item__avatar',
                        src: avatarPlaceholderSrc,
                        availableTypes: availableTypes
                    }),
                    onClick: () => {
                        OnOpenChat({
                            ChatProfile: new ChatProfile({
                                Avatar: new Avatar({
                                    id: 'avatar',
                                    name: 'avatar',
                                    className: 'chat-item__avatar',
                                    src: avatarPlaceholderSrc,
                                    availableTypes: availableTypes
                                }),
                                name: 'Андрей'
                            }),
                            messages: [
                                new ChatDate({ date: '19 июня' }),
                                new ChatMessage({
                                    content: {
                                        text: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро. a  a  a  a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a`,
                                        time: '11:56'
                                    },
                                    owner: false
                                }),
                                new ChatMessage({
                                    content: {
                                        text: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро. a  a  a  a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a`,
                                        time: '11:56'
                                    },
                                    owner: false
                                }),
                                new ChatMessage({
                                    content: {
                                        text: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро. a  a  a  a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a`,
                                        time: '11:56'
                                    },
                                    owner: false
                                }),
                                new ChatMessage({
                                    content: {
                                        text: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро. a  a  a  a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a`,
                                        time: '11:56'
                                    },
                                    owner: false
                                }),
                                new ChatMessage({
                                    content: {
                                        src: mockPicture,
                                        time: '11:56',
                                        read: true
                                    },
                                    owner: true
                                }),
                                new ChatMessage({
                                    content: {
                                        text: 'Круто!',
                                        time: '12:00'
                                    },
                                    owner: true
                                })
                            ]
                        });
                    }
                }),
                new ChatItem({
                    name: 'Киноклуб',
                    lastMessage: 'стикер',
                    time: '10:49',
                    thisUserMessage: true,
                    Avatar: new Avatar({
                        id: 'avatar',
                        name: 'avatar',
                        className: 'chat-item__avatar',
                        src: avatarPlaceholderSrc,
                        availableTypes: availableTypes
                    }),
                    onClick: () => {
                        OnOpenChat({
                            ChatProfile: new ChatProfile({
                                Avatar: new Avatar({
                                    id: 'avatar',
                                    name: 'avatar',
                                    className: 'chat-item__avatar',
                                    src: avatarPlaceholderSrc,
                                    availableTypes: availableTypes
                                }),
                                name: 'Киноклуб'
                            }),
                            messages: [
                                new ChatDate({ date: '19 июня' }),
                                new ChatMessage({
                                    content: {
                                        text: `Скоро выход фильма Дедлайн!`,
                                        time: '11:56'
                                    },
                                    owner: false
                                })
                            ]
                        });
                    }
                })
            ]
        };

        super(initProps);
    }

    override render(): string {
        return template;
    }
}

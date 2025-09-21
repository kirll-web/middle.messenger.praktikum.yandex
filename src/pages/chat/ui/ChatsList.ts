import { availableTypes } from '@pages/profile/model/consts';
import { Avatar, Navbar, Search } from '@shared/ui';
import { Block } from '@shared/utils';
import { avatarPlaceholderSrc } from '../../../assets';
import template from '../template/chats-list.hbs?raw';
import { ChatItem } from './ChatItem';

export type ChatListPageProps = {
    Navbar: Navbar;
};

export class ChatListPage extends Block {
    constructor({ Navbar }: ChatListPageProps) {
        const initProps: {
            Search: Search;
            chatItems: ChatItem[];
        } & ChatListPageProps = {
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
                    })
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
                    })
                })
            ],
            Navbar
        };

        super(initProps);
    }

    override render(): string {
        return template;
    }
}

import { userStore } from '@entities/user';
import { buildImageLink, getTime, RoutePath, Validator } from '@shared/lib';
import { Avatar, Button, Form, FormInput, Link, Search } from '@shared/ui';
import { modalStore } from '@shared/ui/Modal/ModalStore';
import { Block, Router } from '@shared/utils';

import { tryCreateChat } from '../lib/createChat';
import { getChats } from '../lib/getChats';
import template from '../template/chats-list.hbs?raw';
import { ChatProps } from './Chat';
import { ChatItem } from './ChatItem';
import { ChatModalContent } from './ChatModalContent';
import { ChatProfile } from './ChatProfile';

export type ChatListProps = {
    OnOpenChat(chatProps: ChatProps): void;
};

type Props = {
    CreateChat: Link;
    ProfileLink: Link;
    Search: Search;
    chatItems: ChatItem[];
};

export class ChatList extends Block {
    router: Router;
    userStore = userStore;
    OnOpenChat: (chatProps: ChatProps) => void;

    constructor({ OnOpenChat }: ChatListProps) {
        const initProps: Omit<Props, 'chatItems'> = {
            CreateChat: new Link({
                id: 'profileLink',
                text: 'Создать чат >',
                className: 'chat__profile-link',
                onClick: () => this.showCreateChatModal()
            }),
            ProfileLink: new Link({
                id: 'profileLink',
                text: 'Профиль >',
                className: 'chat__profile-link',
                onClick: () => this.router.go(RoutePath.Profile)
            }),
            Search: new Search({ name: 'chat-search', placeholder: 'Поиск' })
        };

        super(initProps);
        this.router = new Router();

        this.OnOpenChat = OnOpenChat;
        this.setChats();
    }

    setChats = () => {
        getChats().then((data) => {
            const items = data.map((chat) => {
                return new ChatItem({
                    name: chat.title,
                    lastMessage: chat.last_message?.content || '',
                    time: chat.last_message?.time ? getTime(chat.last_message?.time) : '',
                    messageCount: chat.unread_count,
                    Avatar: new Avatar({
                        className: 'chat-item__avatar',
                        src: chat.avatar ? buildImageLink(chat.avatar) : undefined
                    }),
                    onClick: () => {
                        const user = this.userStore.getState().user;
                        if (!user) {
                            return;
                        }

                        this.OnOpenChat({
                            chatId: chat.id,
                            ChatProfile: new ChatProfile({
                                chatId: chat.id,
                                avatarSrc: chat.avatar || undefined,
                                name: chat.title,
                                createdBy: chat.created_by
                            })
                        });
                    }
                });
            });
            this.setProps({
                chatItems: items
            });
        });
    };

    private showCreateChatModal() {
        modalStore.setContent({
            Content: new ChatModalContent({
                Form: new Form({
                    title: 'Создать чат',
                    className: 'chat__modal-form',
                    inputs: [
                        new FormInput({
                            id: 'chatName',
                            type: 'string',
                            name: 'chat_name',
                            label: 'Название чата',
                            onValidate: (value: string) => {
                                return Validator.validateName(value);
                            }
                        })
                    ],
                    buttons: [
                        new Button({
                            id: 'createChat',
                            className: 'chat__modal-button',
                            text: 'Создать',
                            type: 'submit'
                        })
                    ],
                    onSubmit: async (event: SubmitEvent) => {
                        event.preventDefault();

                        const form = event.target as HTMLFormElement;
                        const formData = new FormData(form);
                        const values = Object.fromEntries(formData.entries()) as { chat_name: string };
                        const createdChat = await tryCreateChat(values.chat_name);

                        if (createdChat) {
                            new Router().go(RoutePath.Chat);
                        }
                    }
                })
            })
        });
        modalStore.show();
    }

    override render(): string {
        return template;
    }
}

import { userStore } from '@entities/user';
import { RoutePath, Validator } from '@shared/lib';
import { Button, Form, FormInput, PopupMenu, PopupMenuButton } from '@shared/ui';
import { modalStore } from '@shared/ui/Modal/ModalStore';
import { Block, Router } from '@shared/utils';

import { tryDeleteChat } from '../lib/deleteChat';
import { tryAddUserToChat } from '../lib/tryAddUserToChat';
import { tryDeleteUserToChat } from '../lib/tryDeleteUserToChat';
import template from '../template/chat-profile-button.hbs?raw';
import { ChatAddUserIcon } from './ChatAddUserIcon';
import { ChatModalContent } from './ChatModalContent';
import { ChatRemoveUserIcon } from './ChatRemoveUserIcon';

export type ChatProfileButtonProps = {
    chatId: number;
    createdBy: number;
};

export const getInitModal = (chatId?: number) => ({
    Content: new ChatModalContent({
        Form: new Form({
            title: 'Добавить пользователя',
            className: 'chat__modal-form',
            inputs: [
                new FormInput({
                    id: 'chatUser',
                    type: 'string',
                    name: 'chat_user',
                    label: 'Id пользователя',
                    onValidate: (id: string) => Validator.validateId(id)
                })
            ],
            buttons: [
                new Button({
                    id: 'createChat',
                    className: 'chat__modal-button',
                    text: 'Добавить',
                    type: 'submit'
                })
            ],
            onSubmit: async (event: SubmitEvent) => {
                if (chatId === undefined) {
                    return;
                }
                event.preventDefault();

                const form = event.target as HTMLFormElement;
                const formData = new FormData(form);

                const values = Object.fromEntries(formData.entries()) as { chat_user: string };
                const createdChat = await tryAddUserToChat(values.chat_user, chatId);

                if (createdChat) {
                    modalStore.hide();
                }
            }
        })
    }),
    needDialog: false
});

export class ChatProfileButton extends Block {
    private menu: PopupMenu;

    constructor({ chatId, createdBy }: ChatProfileButtonProps) {
        const menu = new PopupMenu({
            hidden: true,
            buttons: [
                new PopupMenuButton({
                    Icon: new ChatAddUserIcon(),
                    text: 'Добавить пользователя',
                    onClick: () => {
                        modalStore.setContent(getInitModal(chatId));
                        modalStore.show();
                    }
                }),
                new PopupMenuButton({
                    Icon: new ChatRemoveUserIcon(),
                    text: 'Удалить пользователя',
                    onClick: () => {
                        modalStore.setContent({
                            Content: new ChatModalContent({
                                Form: new Form({
                                    title: 'Удалить пользователя',
                                    className: 'chat__modal-form',
                                    inputs: [
                                        new FormInput({
                                            id: 'chatUser',
                                            type: 'string',
                                            name: 'chat_user',
                                            label: 'Id пользователя',
                                            onValidate: (id: string) => Validator.validateId(id)
                                        })
                                    ],
                                    buttons: [
                                        new Button({
                                            id: 'deleteUser',
                                            className: 'chat__modal-button',
                                            text: 'Добавить',
                                            type: 'submit'
                                        })
                                    ],
                                    onSubmit: async (event: SubmitEvent) => {
                                        event.preventDefault();

                                        const form = event.target as HTMLFormElement;
                                        const formData = new FormData(form);

                                        const values = Object.fromEntries(formData.entries()) as { chat_user: string };
                                        const userDeleted = await tryDeleteUserToChat(values.chat_user, chatId);

                                        if (userDeleted) {
                                            modalStore.hide();
                                        }
                                    }
                                })
                            }),
                            needDialog: false
                        });
                        modalStore.show();
                    }
                }),
                ...[
                    createdBy === userStore.getState().user?.id
                        ? new PopupMenuButton({
                              Icon: new ChatRemoveUserIcon(),
                              text: 'Удалить чат',
                              onClick: async () => {
                                  const chatDeleted = await tryDeleteChat(chatId);
                                  if (chatDeleted) {
                                      new Router().go(RoutePath.Chat);
                                  }
                              }
                          })
                        : null
                ].filter((button) => !!button)
            ],
            className: 'chat__menu'
        });

        super({
            PopupMenu: menu,
            events: {
                click: (event: MouseEvent) => this.toggleShowedMenu(event)
            }
        });

        this.menu = menu;
    }

    toggleShowedMenu = (event: MouseEvent) => {
        event.stopImmediatePropagation();
        event.stopPropagation();
        const element = event.target as HTMLElement;

        if (!element.classList.contains('chat__profile-button')) {
            return;
        }

        this.hide();
        this.menu.toggleShowed();
    };

    override render() {
        return template;
    }
}

import { userStore } from '@entities/user';
import { Modal } from '@shared/ui/Modal';
import { Block } from '@shared/utils';

import template from '../template/chat-page.hbs?raw';
import { Chat, ChatProps } from './Chat';
import { getInitModal } from './ChatProfileButton';
import { ChatStub } from './ChatStub';
import { ChatList } from './ChatsList';

type Props = {
    ChatList: ChatList;
};

export class ChatPage extends Block {
    constructor() {
        super({
            Chat: new ChatStub(),
            Modal: new Modal(getInitModal())
        });

        const user = userStore.getState();

        if (!user) {
            return;
        }

        const initProps: Props = {
            ChatList: new ChatList({
                OnOpenChat: (chatProps: ChatProps) => {
                    this.openChat(chatProps);
                }
            })
        };

        this.setProps({
            ...initProps
        });

        console.warn(this.children.Modal.id);
    }

    private openChat(chatProps: ChatProps) {
        this.setProps({ Chat: new Chat(chatProps) });
    }

    override render() {
        return template;
    }
}

import { Navbar } from '@shared/ui';
import { Block } from '@shared/utils';

import template from '../template/chat-page.hbs?raw';
import { Chat, ChatProps } from './Chat';
import { ChatList } from './ChatsList';

export type ChatPageProps = {
    Navbar: Navbar;
};

export class ChatPage extends Block {
    constructor({ Navbar }: ChatPageProps) {
        super({
            Chat: new Chat({}),
            ChatList: new ChatList({
                OnOpenChat: (chatProps: ChatProps) => {
                    this.openChat(chatProps);
                }
            }),
            Navbar
        });

        this.setProps({});
    }

    private openChat(chatProps: ChatProps) {
        this.setProps({ Chat: new Chat(chatProps) });
    }

    override render() {
        return template;
    }
}

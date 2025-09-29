import { Avatar } from '@shared/ui';
import { Block } from '@shared/utils';

import template from '../template/chat-profile.hbs?raw';
import { ChatProfileButton } from './ChatProfileButton';

export type ChatProfileProps = {
    Avatar: Avatar;
    name: string;
};

export class ChatProfile extends Block {
    constructor({ Avatar, name }: ChatProfileProps) {
        super({
            Avatar,
            name,
            ChatProfileButton: new ChatProfileButton()
        });
    }

    override render() {
        return template;
    }
}

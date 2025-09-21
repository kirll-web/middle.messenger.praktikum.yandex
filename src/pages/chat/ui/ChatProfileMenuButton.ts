import { Block } from '@shared/utils';
import template from '../template/chat-profile-menu-button.hbs?raw';
import { ChatProfileMenuButtonIcon } from './ChatProfileMenuButtonIcon';

export type ChatProfileMenuButtonProps = {
    ChatProfileMenuButtonIcon: ChatProfileMenuButtonIcon;
    text: string;
};

export class ChatProfileMenuButton extends Block {
    constructor({ ChatProfileMenuButtonIcon, text }: ChatProfileMenuButtonProps) {
        super({
            ChatProfileMenuButtonIcon,
            text
        });
    }

    override render() {
        return template;
    }
}

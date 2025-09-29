import { Block } from '@shared/utils';

import templateAdd from '../template/chat-profile-menu-button-icon-add.hbs?raw';
import templateRemove from '../template/chat-profile-menu-button-icon-remove.hbs?raw';

type ChatProfileMenuButtonIconType = 'add' | 'remove';

export type ChatProfileMenuButtonIconProps = {
    type: ChatProfileMenuButtonIconType;
};

export class ChatProfileMenuButtonIcon extends Block {
    constructor({ type }: ChatProfileMenuButtonIconProps) {
        super({ type });
    }

    override render() {
        const type = this.props.type as ChatProfileMenuButtonIconType;

        return type === 'add' ? templateAdd : templateRemove;
    }
}

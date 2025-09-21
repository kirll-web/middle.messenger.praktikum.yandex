import { PopupMenu, PopupMenuButton } from '@shared/ui';
import { Block } from '@shared/utils';
import template from '../template/chat-profile-button.hbs?raw';
import { ChatAddUserIcon } from './ChatAddUserIcon';
import { ChatRemoveUserIcon } from './ChatRemoveUserIcon';

export type ChatProfileButtonProps = {};

export class ChatProfileButton extends Block {
    private menu: PopupMenu;

    constructor() {
        const menu = new PopupMenu({
            hidden: true,
            buttons: [
                new PopupMenuButton({
                    Icon: new ChatAddUserIcon(),
                    text: 'Добавить пользователя'
                }),
                new PopupMenuButton({
                    Icon: new ChatRemoveUserIcon(),
                    text: 'Удалить пользователя'
                })
            ],
            className: 'chat__menu'
        });
        super({
            PopupMenu: menu,
            events: {
                click: () => this.toggleShowedMenu()
            }
        });

        this.menu = menu;
    }

    toggleShowedMenu = () => {
        this.menu.toggleShowed();
    };

    override render() {
        return template;
    }
}

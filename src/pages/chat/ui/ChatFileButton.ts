import { PopupMenu, PopupMenuButton } from '@shared/ui';
import { Block } from '@shared/utils';

import template from '../template/chat-file-button.hbs?raw';
import { ChatFileIcon } from './ChatFileIcon';
import { ChatLocationIcon } from './ChatLocationIcon';
import { ChatPhotoIcon } from './ChatPhotoIcon';

export class ChatFileButton extends Block {
    private menu: PopupMenu;
    constructor() {
        const menu = new PopupMenu({
            hidden: true,
            buttons: [
                new PopupMenuButton({
                    Icon: new ChatPhotoIcon(),
                    text: 'Фото или Видео',
                    onClick: () => {}
                }),
                new PopupMenuButton({
                    Icon: new ChatFileIcon(),
                    text: 'Файл',
                    onClick: () => {}
                }),
                new PopupMenuButton({
                    Icon: new ChatLocationIcon(),
                    text: 'Локация',
                    onClick: () => {}
                })
            ],
            className: 'chat__file-menu'
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

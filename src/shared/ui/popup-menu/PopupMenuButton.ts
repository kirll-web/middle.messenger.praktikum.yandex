import { Block } from '@shared/utils';

import { AbstractSvgIcon } from '../svg-icon/AbstractSvgIcon';
import template from './PopupMenuButton.hbs?raw';

export type PopupMenuButtonProps = {
    Icon: AbstractSvgIcon;
    text: string;
    onClick(): void;
};

export class PopupMenuButton extends Block {
    constructor({ Icon, text, onClick }: PopupMenuButtonProps) {
        super({
            SvgIcon: Icon,
            text,
            events: {
                click: onClick
            }
        });
    }

    override render() {
        return template;
    }
}

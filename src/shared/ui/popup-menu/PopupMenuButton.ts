import { Block } from '@shared/utils';

import { AbstractSvgIcon } from '../svg-icon/AbstractSvgIcon';
import template from './PopupMenuButton.hbs?raw';

export type PopupMenuButtonProps = {
    Icon: AbstractSvgIcon;
    text: string;
};

export class PopupMenuButton extends Block {
    constructor({ Icon, text }: PopupMenuButtonProps) {
        super({
            SvgIcon: Icon,
            text
        });
    }

    override render() {
        return template;
    }
}

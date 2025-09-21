import { Block } from '@shared/utils';
import { insertToObject } from './../../utils/insertToObject';
import template from './PopupMenu.hbs?raw';
import { PopupMenuButton } from './PopupMenuButton';

export type PopupMenuProps = {
    buttons: PopupMenuButton[];
    hidden: boolean;
    className?: string;
};

export class PopupMenu extends Block {
    constructor({ buttons, hidden, className }: PopupMenuProps) {
        super({ buttons, hidden, ...insertToObject('className', className) });
    }

    public toggleShowed() {
        this.setProps({ hidden: !this.props.hidden as boolean });
    }

    override render() {
        return template;
    }
}

import { Block } from '@shared/utils';

import template from './ModalOverlay.hbs?raw';
import { modalStore } from './ModalStore';

type ModalOverlayProps = {
    Dialog: Block;
};

export class ModalOverlay extends Block {
    constructor({ Dialog }: ModalOverlayProps) {
        super({
            Dialog: Dialog,
            className: 'modal_hide',
            events: {
                click: (event: MouseEvent) => {
                    event.stopImmediatePropagation();
                    event.stopPropagation();
                    const element = event.target as HTMLElement;

                    if (!element.classList.contains('modal__overlay')) {
                        return;
                    }

                    modalStore.hide();
                }
            }
        });
    }

    override render() {
        return template;
    }

    public show() {
        this.setProps({
            className: ''
        });
    }

    public hide() {
        this.setProps({
            className: 'modal_hide'
        });
    }
}

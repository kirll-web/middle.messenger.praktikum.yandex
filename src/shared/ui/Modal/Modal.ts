import { Block } from '@shared/utils';
import { StoreEvents } from '@shared/utils/Store';

import { Dialog } from './Dialog';
import template from './Modal.hbs?raw';
import { ModalOverlay } from './ModalOverlay';
import { modalStore } from './ModalStore';
import { ModalProps } from './type';

export class Modal extends Block {
    modalOverlay?: ModalOverlay;

    constructor({ Content, needDialog }: ModalProps) {
        super();
        this.modalOverlay = Modal.getModalOverlay(!!needDialog, Content);
        this.setProps({ ModalOverlay: this.modalOverlay });
        modalStore.hide();

        modalStore.on(StoreEvents.Updated, async () => {
            const state = modalStore.getState();
            if (state.content) {
                this.setContent(state.content);
            }
            if (state.show) {
                this.showModal();
            }

            if (!state.show) {
                this.hideModal();
            }
        });
    }

    private static getModalOverlay = (needDialog: boolean, Content?: Block) => {
        if (Content) {
            return new ModalOverlay({
                Dialog: needDialog ? new Dialog({ Content }) : Content
            });
        }

        return undefined;
    };

    public setContent({ Content, needDialog }: ModalProps) {
        if (Content) {
            this.modalOverlay?.setProps({ Dialog: needDialog ? new Dialog({ Content }) : Content });
        }
    }

    override render() {
        return template;
    }

    private showModal() {
        this.modalOverlay?.show();
    }

    private hideModal() {
        this.modalOverlay?.hide();
    }
}

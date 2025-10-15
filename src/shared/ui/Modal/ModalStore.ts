import { Store } from '@shared/utils';

import { ModalProps } from './type';

type ModalState = {
    show: boolean;
    content?: ModalProps;
};

class ModalStore extends Store<ModalState> {
    protected override state = {
        show: false
    };

    public hide = () => {
        this.set('show', false);
    };

    public show = () => {
        this.set('show', true);
    };

    public setContent = (content: ModalProps) => {
        this.set('content', content);
    };
}

export const modalStore = new ModalStore();

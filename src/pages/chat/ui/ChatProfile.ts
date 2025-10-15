import { buildImageLink, RoutePath, Validator } from '@shared/lib';
import { Avatar, Button, Form, FormInput } from '@shared/ui';
import { modalStore } from '@shared/ui/Modal/ModalStore';
import { Block, Router } from '@shared/utils';

import { uploadAvatar } from '../lib/uploadAvatar';
import template from '../template/chat-profile.hbs?raw';
import { ChatModalContent } from './ChatModalContent';
import { ChatProfileButton } from './ChatProfileButton';

export type ChatProfileProps = {
    chatId: number;
    avatarSrc?: string;
    name: string;
    createdBy: number;
};

export class ChatProfile extends Block {
    constructor({ chatId, avatarSrc, name, createdBy }: ChatProfileProps) {
        super({
            Avatar: new Avatar({
                className: 'chat__profile-avatar',
                src: avatarSrc ? buildImageLink(avatarSrc) : undefined,
                onClick: () => {
                    modalStore.setContent({
                        Content: new ChatModalContent({
                            Form: new Form({
                                title: 'Загрузить аватар',
                                className: 'chat__modal-form',
                                inputs: [
                                    new FormInput({
                                        id: 'uploadAvatarInput',
                                        type: 'file',
                                        name: 'avatar',
                                        label: 'Выбрать файл на компьютере',
                                        onValidate: (file: File) => Validator.validateFile(file)
                                    })
                                ],
                                buttons: [
                                    new Button({
                                        id: 'createChat',
                                        className: 'chat__modal-button',
                                        text: 'Создать',
                                        type: 'submit'
                                    })
                                ],
                                onSubmit: async (event: SubmitEvent) => {
                                    event.preventDefault();
                                    const form = event.target as HTMLFormElement;
                                    const formData = new FormData(form);

                                    const newData = Object.fromEntries(formData.entries());
                                    const newFormData = new FormData();
                                    const file: File = newData.avatar as File;
                                    newFormData.append('avatar', file);
                                    const avatarCreated = await uploadAvatar(chatId, newFormData);

                                    if (avatarCreated) {
                                        new Router().go(RoutePath.Chat);
                                    }
                                }
                            })
                        })
                    });
                    modalStore.show();
                }
            }),
            name,
            ChatProfileButton: new ChatProfileButton({ chatId, createdBy })
        });
    }

    override render() {
        return template;
    }
}

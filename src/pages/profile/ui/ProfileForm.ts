import { getUser, User, UserData } from '@entities/user';
import { buildImageLink, RoutePath, Validator } from '@shared/lib';
import { Avatar, Button, Form, FormInput, Link, ProfileField } from '@shared/ui';
import { modalStore } from '@shared/ui/Modal/ModalStore';
import { ProfileFieldProps } from '@shared/ui/profile/ProfileField';
import { Block, Router } from '@shared/utils';

import { changePassword } from '../lib/changePassword';
import { changeProfileData } from '../lib/changeProfileData';
import { uploadAvatar } from '../lib/uploadAvatar';
import { PasswordData } from '../model/types';
import template from '../template/profile-form.hbs?raw';
import { tryLogout } from './../lib/tryLogout';
import './Profile.scss';

export type ProfileType = 'view' | 'edit' | 'changePassword';

export type ProfileFormProps = {
    type: ProfileType;
    user: User;
};

type Props = Omit<ProfileFormProps, 'user'> & {
    edit: boolean;
    Avatar: Avatar;
    name: string;
    buttons: Button[];
    fields: ProfileField[];
    SaveButton: Button;
};

export const getChangeProfileAvatarModal = (onAvatarUpdated: () => void) => ({
    Content: new Form({
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
            const avatarUpload = await uploadAvatar(newFormData);
            if (avatarUpload) {
                onAvatarUpdated();
                modalStore.hide();
            }
        }
    }),
    needDialog: false
});

export class ProfileForm extends Block<Props> {
    user: User;
    router: Router;

    changePasswordFields: ProfileFieldProps[] = [
        {
            id: 'oldPassword',
            type: 'password',
            label: 'Старый пароль',
            name: 'oldPassword',
            error: 'Неправильный старый пароль',
            onValidate: (value: string) => {
                return Validator.validatePassword(value);
            }
        },
        {
            id: 'newPassword',
            type: 'password',
            label: 'Новый пароль',
            name: 'newPassword',
            error: 'Новый пароль не соответствует правилам пароля',
            onValidate: (value: string) => {
                return Validator.validatePassword(value);
            }
        }
    ];
    inputs: ProfileField[];

    constructor({ type, user }: ProfileFormProps) {
        super();
        this.user = user;
        this.router = new Router();

        let fields;

        switch (type) {
            case 'view':
                fields = this.getViewFields();
                break;
            case 'changePassword':
                fields = this.changePasswordFields;
                break;
            case 'edit':
                fields = this.getEditFields();
                break;
        }

        const inputs = fields.map((field) => {
            return new ProfileField(field);
        });
        const initProps: Props = {
            type: type,
            Avatar: new Avatar({
                src: this.user.avatar ? buildImageLink(this.user.avatar) : undefined,
                onClick: () => {}
            }),
            name: `${this.user.firstName} ${this.user.secondName}`,
            fields: inputs,
            buttons: [
                new Link({
                    id: 'changeProfileData',
                    text: 'Изменить данные',
                    className: 'profile__button',
                    onClick: () => {
                        this.changeType('edit');
                    }
                }),
                new Link({
                    id: 'changePassword',
                    text: 'Изменить пароль',
                    className: 'profile__button',
                    onClick: () => this.changeType('changePassword')
                }),
                new Link({
                    id: 'Logout',
                    text: 'Выйти',
                    className: ' profile__button profile__button_danger',
                    onClick: async () => {
                        const logout = await tryLogout();

                        if (logout) {
                            this.router.go(RoutePath.Auth);
                        }
                    }
                })
            ],
            SaveButton: new Button({
                id: 'Save',
                text: 'Сохранить',
                className: 'profile__button_save',
                type: 'submit'
            }),
            edit: type === 'edit' || type === 'changePassword'
        };

        this.setProps({
            ...initProps,
            type: type,
            events: {
                submit: async (event: SubmitEvent) => {
                    event.preventDefault();

                    const valid = this.inputs
                        .map((input) => input.isValid())
                        .every((inputValid) => inputValid === true);
                    if (!valid) {
                        return;
                    }

                    const form = event.target as HTMLFormElement;
                    const formData = new FormData(form);
                    if (this.props.type === 'changePassword') {
                        const { oldPassword, newPassword } = Object.fromEntries(formData.entries()) as PasswordData;
                        const executed = await changePassword({ oldPassword, newPassword });
                        if (executed) {
                            this.changeType('view');
                        }
                        return;
                    }

                    if (this.props.type === 'edit') {
                        const { first_name, second_name, display_name, phone, login, email } = Object.fromEntries(
                            formData.entries()
                        ) as UserData;

                        const changed = await changeProfileData({
                            first_name,
                            second_name,
                            display_name,
                            phone,
                            login,
                            email
                        });
                        if (changed) {
                            const user = await getUser();

                            if (user) {
                                this.user = user;
                                this.changeType('view');
                            }
                        }
                        return;
                    }
                }
            }
        });
        this.inputs = inputs;
    }

    changeType = (type: ProfileType) => {
        let fields;
        let avatar: Avatar;
        switch (type) {
            case 'view':
                avatar = new Avatar({
                    src: this.user.avatar ? buildImageLink(this.user.avatar) : undefined,
                    onClick: () => {}
                });
                fields = this.getViewFields();
                break;
            case 'changePassword':
                avatar = new Avatar({
                    src: this.user.avatar ? buildImageLink(this.user.avatar) : undefined,
                    onClick: () => {}
                });
                fields = this.changePasswordFields;
                break;
            case 'edit':
                avatar = new Avatar({
                    src: this.user.avatar ? buildImageLink(this.user.avatar) : undefined,
                    onClick: () => {
                        modalStore.setContent(
                            getChangeProfileAvatarModal(() => {
                                getUser().then((user) => {
                                    if (!user) {
                                        new Router().go(RoutePath.Auth);
                                        return;
                                    }
                                    this.user = user;

                                    this.changeType('edit');
                                });
                            })
                        );
                        modalStore.show();
                    }
                });
                fields = this.getEditFields();
                break;
        }
        this.setProps({
            Avatar: avatar,
            name: `${this.user.firstName} ${this.user.secondName}`,
            fields: fields.map((field) => {
                return new ProfileField(field);
            }),
            edit: type === 'edit' || type === 'changePassword',
            type: type
        });
    };

    private getViewFields = () => {
        const viewFields: ProfileFieldProps[] = [
            {
                id: 'email',
                label: 'Почта',
                type: 'email',
                name: 'email',
                value: this.user.email,
                disabled: true
            },
            {
                id: 'login',
                type: 'text',
                label: 'Логин',
                name: 'login',
                value: this.user.login,
                disabled: true
            },
            {
                id: 'first_name',
                type: 'text',
                label: 'Имя',
                name: 'first_name',
                value: this.user.firstName,
                disabled: true
            },
            {
                id: 'second_name',
                type: 'text',
                label: 'Фамилия',
                name: 'second_name',
                value: this.user.secondName,
                disabled: true
            },
            {
                id: 'display_name',
                type: 'text',
                label: 'Имя в чате',
                name: 'display_name',
                value: this.user.displayName,
                disabled: true
            },
            {
                id: 'phone',
                type: 'phone',
                label: 'Телефон',
                name: 'phone',
                value: this.user.phone,
                disabled: true
            }
        ];

        return viewFields;
    };

    private getEditFields = () => {
        const editFields: ProfileFieldProps[] = [
            {
                id: 'email',
                label: 'Почта',
                type: 'email',
                name: 'email',
                value: this.user.email,
                error: 'Неправильная почта',
                onValidate: (value: string) => {
                    return Validator.validateEmail(value);
                }
            },
            {
                id: 'login',
                type: 'text',
                label: 'Логин',
                name: 'login',
                value: this.user.login,
                error: 'Неправильный логин',
                onValidate: (value: string) => {
                    return Validator.validateLogin(value);
                }
            },
            {
                id: 'first_name',
                type: 'text',
                label: 'Имя',
                name: 'first_name',
                value: this.user.firstName,
                error: 'Неправильное имя',
                onValidate: (value: string) => {
                    return Validator.validateName(value);
                }
            },
            {
                id: 'second_name',
                type: 'text',
                label: 'Фамилия',
                name: 'second_name',
                value: this.user.secondName,
                error: 'Неправильная фамилия',
                onValidate: (value: string) => {
                    return Validator.validateName(value);
                }
            },
            {
                id: 'display_name',
                type: 'text',
                label: 'Имя в чате',
                name: 'display_name',
                value: this.user.displayName,
                error: 'Неправильное имя в чате',
                onValidate: (value: string) => {
                    return Validator.validateName(value);
                }
            },
            {
                id: 'phone',
                type: 'phone',
                label: 'Телефон',
                name: 'phone',
                value: this.user.phone,
                error: 'Неправильный телефон',
                onValidate: (value: string) => {
                    return Validator.validatePhone(value);
                }
            }
        ];

        return editFields;
    };

    override render(): string {
        return template;
    }
}

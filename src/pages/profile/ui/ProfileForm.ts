import { Validator } from '@shared/lib';
import { Avatar, Button, Link, ProfileField } from '@shared/ui';
import { ProfileFieldProps } from '@shared/ui/profile/ProfileField';
import { Block } from '@shared/utils';

import { avatarPlaceholderSrc } from '../../../assets';
import { availableTypes } from '../model/consts';
import template from '../template/profile-form.hbs?raw';
import './Profile.scss';

export type ProfileType = 'view' | 'edit' | 'changePassword';

export type ProfileFormProps = {
    type: ProfileType;
};

type Props = Omit<ProfileFormProps, 'type'> & {
    edit: boolean;
    Avatar: Avatar;
    name: string;
    buttons: Button[];
    fields: ProfileField[];
    SaveButton: Button;
};

export class ProfileForm extends Block<Props> {
    oldPassword: string;
    viewFields: ProfileFieldProps[] = [
        {
            id: 'email',
            label: 'Почта',
            type: 'email',
            name: 'email',
            value: 'pochta@yandex.ru',
            disabled: true
        },
        {
            id: 'login',
            type: 'text',
            label: 'Логин',
            name: 'login',
            value: 'ivanivanov',
            disabled: true
        },
        {
            id: 'first_name',
            type: 'text',
            label: 'Имя',
            name: 'first_name',
            value: 'Иван',
            disabled: true
        },
        {
            id: 'second_name',
            type: 'text',
            label: 'Фамилия',
            name: 'second_name',
            value: 'Иванов',
            disabled: true
        },
        {
            id: 'display_name',
            type: 'text',
            label: 'Имя в чате',
            name: 'display_name',
            value: 'Кастыбый',
            disabled: true
        },
        {
            id: 'phone',
            type: 'phone',
            label: 'Телефон',
            name: 'phone',
            value: '+7 (909) 967 30 30',
            disabled: true
        }
    ];

    editFields: ProfileFieldProps[] = [
        {
            id: 'email',
            label: 'Почта',
            type: 'email',
            name: 'email',
            value: 'pochta@yandex.ru',
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
            value: 'ivanivanov',
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
            value: 'Иван',
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
            value: 'Иванов',
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
            value: 'Кастыбый',
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
            value: '+7 (909) 967 30 30',
            error: 'Неправильный телефон',
            onValidate: (value: string) => {
                return Validator.validatePhone(value);
            }
        }
    ];
    changePasswordFields: ProfileFieldProps[] = [
        {
            id: 'oldPassword',
            type: 'password',
            label: 'Старый пароль',
            name: 'oldPassword',
            error: 'Неправильный старый пароль',
            onValidate: (value: string) => {
                return Validator.equalsPassword(this.oldPassword, value);
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
        },
        {
            id: 'phone',
            type: 'phone',
            label: 'Телефон',
            name: 'phone',
            value: '+7 (909) 967 30 30',
            error: 'Неправильный номер телефона',
            onValidate: (value: string) => {
                return Validator.validatePhone(value);
            }
        }
    ];
    inputs: ProfileField[];

    constructor({ type }: ProfileFormProps) {
        super();
        let fields;

        switch (type) {
            case 'view':
                fields = this.viewFields;
                break;
            case 'changePassword':
                fields = this.changePasswordFields;
                break;
            case 'edit':
                fields = this.editFields;
                break;
        }

        this.oldPassword = '12345';
        const inputs = fields.map((field) => {
            return new ProfileField(field);
        });
        const initProps: Props = {
            Avatar: new Avatar({
                id: 'avatar',
                name: 'avatar',
                src: avatarPlaceholderSrc,
                availableTypes: availableTypes
            }),
            name: 'Иван Иванов',
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
                    className: ' profile__button profile__button_danger'
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
            events: {
                submit: (event: SubmitEvent) => {
                    event.preventDefault();
                    const valid = this.inputs
                        .map((input) => input.isValid())
                        .some((inputValid) => inputValid === false);

                    if (!valid) {
                        return;
                    }

                    console.log(2);
                    const form = event.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const values = Object.fromEntries(formData.entries());

                    console.log(values);
                }
            }
        });
        this.inputs = inputs;
    }

    changeType = (type: ProfileType) => {
        let fields;

        switch (type) {
            case 'view':
                fields = this.viewFields;
                break;
            case 'changePassword':
                fields = this.changePasswordFields;
                break;
            case 'edit':
                fields = this.editFields;
                break;
        }

        this.setProps({
            fields: fields.map((field) => {
                console.log(field);
                return new ProfileField(field);
            }),
            edit: type === 'edit' || type === 'changePassword'
        });
    };

    override render(): string {
        return template;
    }
}

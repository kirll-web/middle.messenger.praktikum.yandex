import { Avatar, Button, Navbar, ProfileField } from '@shared/ui';
import { Block } from '@shared/utils';
import { avatarPlaceholderSrc } from '../../../assets';
import { availableTypes } from '../model/consts';
import template from '../template/profile.hbs?raw';
import './Profile.scss';

// export const profileRender = () =>
//     Handlebars.compile(ProfileTemplate)({
//         avatar: {
//             id: 'avatar',
//             name: 'avatar',
//             src: avatarPlaceholder,
//             hasAvatar: false,
//             availableTypes: availableTypes
//         },
//         name: 'Иван',
//         fields: [
//             {
//                 id: 'email',
//                 label: 'Почта',
//                 type: 'email',
//                 name: 'email',
//                 value: 'pochta@yandex.ru',
//                 className: ''
//             },
//             {
//                 id: 'login',
//                 type: 'text',
//                 label: 'Логин',
//                 name: 'login',
//                 value: 'ivanivanov',
//                 className: ''
//             },
//             {
//                 id: 'first_name',
//                 type: 'text',
//                 label: 'Имя',
//                 name: 'first_name',
//                 value: 'Иван',
//                 className: ''
//             },
//             {
//                 id: 'second_name',
//                 type: 'text',
//                 label: 'Фамилия',
//                 name: 'second_name',
//                 value: 'Иванов',
//                 className: ''
//             },
//             {
//                 id: 'display_name',
//                 type: 'text',
//                 label: 'Имя в чате',
//                 name: 'display_name',
//                 value: 'Кастыбый',
//                 className: ''
//             },
//             {
//                 id: 'phone',
//                 type: 'phone',
//                 label: 'Телефон',
//                 name: 'phone',
//                 value: '+7 (909) 967 30 30',
//                 className: ''
//             }
//         ],
//         buttons: [
//             {
//                 id: 'changeProfileData',
//                 text: 'Изменить данные',
//                 className: 'button_light profile__button',
//                 type: 'button'
//             },
//             {
//                 id: 'changePassword',
//                 text: 'Изменить пароль',
//                 className: 'button_light profile__button',
//                 type: 'button'
//             },
//             { id: 'Logout', text: 'Выйти', className: 'button_light button_danger profile__button', type: 'button' }
//         ]
//     });

export type ProfileType = 'view' | 'edit' | 'changePassword';

export type ProfilePageProps = {
    type: ProfileType;
    Navbar: Navbar;
};

const viewFields = [
    {
        id: 'email',
        label: 'Почта',
        type: 'email',
        name: 'email',
        value: 'pochta@yandex.ru',
        className: ''
    },
    {
        id: 'login',
        type: 'text',
        label: 'Логин',
        name: 'login',
        value: 'ivanivanov',
        className: ''
    },
    {
        id: 'first_name',
        type: 'text',
        label: 'Имя',
        name: 'first_name',
        value: 'Иван',
        className: ''
    },
    {
        id: 'second_name',
        type: 'text',
        label: 'Фамилия',
        name: 'second_name',
        value: 'Иванов',
        className: ''
    },
    {
        id: 'display_name',
        type: 'text',
        label: 'Имя в чате',
        name: 'display_name',
        value: 'Кастыбый',
        className: ''
    },
    {
        id: 'phone',
        type: 'phone',
        label: 'Телефон',
        name: 'phone',
        value: '+7 (909) 967 30 30',
        className: ''
    }
];
const editFields = [
    {
        id: 'email',
        label: 'Почта',
        type: 'email',
        name: 'email',
        value: 'pochta@yandex.ru',
        className: ''
    },
    {
        id: 'login',
        type: 'text',
        label: 'Логин',
        name: 'login',
        value: 'ivanivanov',
        className: ''
    },
    {
        id: 'first_name',
        type: 'text',
        label: 'Имя',
        name: 'first_name',
        value: 'Иван',
        className: ''
    },
    {
        id: 'second_name',
        type: 'text',
        label: 'Фамилия',
        name: 'second_name',
        value: 'Иванов',
        className: ''
    },
    {
        id: 'display_name',
        type: 'text',
        label: 'Имя в чате',
        name: 'display_name',
        value: 'Кастыбый',
        className: ''
    },
    {
        id: 'phone',
        type: 'phone',
        label: 'Телефон',
        name: 'phone',
        value: '+7 (909) 967 30 30',
        className: ''
    }
];
const changePasswordFields = [
    {
        id: 'oldPassword',
        type: 'password',
        label: 'Старый пароль',
        name: 'oldPassword',
        value: ''
    },
    {
        id: 'newPassword',
        type: 'password',
        label: 'Новый пароль',
        name: 'newPassword',
        value: ''
    },
    {
        id: 'phone',
        type: 'phone',
        label: 'Телефон',
        name: 'phone',
        value: '+7 (909) 967 30 30'
    }
];

export class ProfilePage extends Block {
    constructor({ Navbar, type }: ProfilePageProps) {
        let fields;

        switch (type) {
            case 'view':
                fields = viewFields;
                break;
            case 'changePassword':
                fields = changePasswordFields;
                break;
            case 'edit':
                fields = editFields;
                break;
        }

        const initProps: {
            Avatar: Avatar;
            name: string;
            buttons: Button[];
            fields: ProfileField[];
            SaveButton: Button;
        } & ProfilePageProps = {
            Avatar: new Avatar({
                id: 'avatar',
                name: 'avatar',
                src: avatarPlaceholderSrc,
                availableTypes: availableTypes
            }),
            name: 'Иван Иванов',
            type: type,
            fields: fields.map((field) => new ProfileField(field)),
            buttons: [
                new Button({
                    id: 'changeProfileData',
                    text: 'Изменить данные',
                    light: true,
                    className: 'profile__button',
                    type: 'button'
                }),
                new Button({
                    id: 'changePassword',
                    text: 'Изменить пароль',
                    light: true,
                    className: 'profile__button',
                    type: 'button'
                }),
                new Button({
                    id: 'Logout',
                    text: 'Выйти',
                    light: true,
                    className: 'button_danger profile__button',
                    type: 'button'
                })
            ],
            SaveButton: new Button({
                id: 'Save',
                text: 'Сохранить',
                className: 'profile__button_save',
                type: 'button'
            }),
            Navbar
        };

        super({
            ...initProps,
            edit: initProps.type === 'edit' || initProps.type === 'changePassword'
        });
    }

    override render(): string {
        return template;
    }
}

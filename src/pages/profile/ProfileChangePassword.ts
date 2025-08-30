import Handlebars from 'handlebars';
import avatarPlaceholder from '../../assets/icon/avatar-placeholder.svg';
import ProfileTemplate from './profile.hbs?raw';

export const profileChangePasswordRender = () =>
    Handlebars.compile(ProfileTemplate)({
        changePassword: true,
        avatar: {
            id: 'avatar',
            name: 'avatar',
            src: avatarPlaceholder,
            className: 'avatar',
            hasAvatar: false
        },
        fields: [
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
        ],
        saveButton: {
            id: 'save',
            text: 'Сохранить',
            className: 'profile__button_save profile__button_save_password'
        }
    });

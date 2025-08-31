import avatarPlaceholder from '@assets/icon/avatar-placeholder.svg';
import Handlebars from 'handlebars';
import { availableTypes } from '../model/consts';
import ProfileTemplate from '../template/profile.hbs?raw';
import './Profile.scss';

export const profileEditRender = () =>
    Handlebars.compile(ProfileTemplate)({
        edit: true,
        avatar: {
            id: 'avatar',
            name: 'avatar',
            src: avatarPlaceholder,
            className: 'avatar',
            hasAvatar: false,
            availableTypes: availableTypes
        },
        name: 'Иван',
        fields: [
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
        ],
        saveButton: {
            id: 'save',
            text: 'Сохранить',
            className: 'profile__button_save',
            type: 'submit'
        }
    });

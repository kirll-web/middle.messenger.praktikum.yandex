import Handlebars from 'handlebars';
import avatarPlaceholder from '../../assets/icon/avatar-placeholder.svg';
import ProfileTemplate from './profile.hbs?raw';

export const profileRender = () =>
    Handlebars.compile(ProfileTemplate)({
        avatar: {
            id: 'avatar',
            name: 'avatar',
            src: avatarPlaceholder,
            className: 'avatar',
            hasAvatar: false
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
        buttons: [
            {
                id: 'changeProfileData',
                text: 'Изменить данные',
                className: 'profile__button button_light '
            },
            {
                id: 'changePassword',
                text: 'Изменить пароль',
                className: 'profile__button button_light'
            },
            { id: 'Logout', text: 'Выйти', className: 'profile__button button_light button_danger' }
        ]
    });

import { availableTypes } from '@pages/profile/model/consts';
import { Avatar } from '@shared/ui';
import { Block } from '@shared/utils';
import { avatarPlaceholderSrc, mockPicture } from '../../../assets';
import template from '../template/chat.hbs?raw';
import { ChatDate } from './ChatDate';
import { ChatFooter } from './ChatFooter';
import { ChatMessage } from './ChatMessage';
import { ChatProfile } from './ChatProfile';

export class Chat extends Block {
    constructor() {
        super({
            items: [
                new ChatProfile({
                    Avatar: new Avatar({
                        id: 'avatar',
                        name: 'avatar',
                        className: 'chat-item__avatar',
                        src: avatarPlaceholderSrc,
                        availableTypes: availableTypes
                    }),
                    name: 'Сегёжа'
                }),

                new ChatDate({ date: '19 июня' }),
                new ChatMessage({
                    content: {
                        text: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро. a  a  a  a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a`,
                        time: '11:56'
                    },
                    owner: false
                }),
                new ChatMessage({
                    content: {
                        src: mockPicture,
                        time: '11:56',
                        read: true
                    },
                    owner: true
                }),
                new ChatMessage({
                    content: {
                        text: 'Круто!',
                        time: '12:00'
                    },
                    owner: true
                }),
                new ChatFooter()
            ]
        });
    }

    override render() {
        return template;
    }
}

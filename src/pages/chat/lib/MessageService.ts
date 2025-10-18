import { userStore } from '@entities/user';

import { ChatMessageData, ChatMessagesResponse } from '../model/types';
import { getChatToken } from './getChats';

export class MessageService {
    chatId: number;
    socket?: WebSocket;
    token?: string;
    messages: ChatMessageData[] = [];
    setMessages: (messages: ChatMessageData[]) => void;

    constructor(chatId: number, onSetMessage: (messages: ChatMessageData[]) => void) {
        this.chatId = chatId;
        this.init();
        this.setMessages = onSetMessage;
    }

    private async init() {
        const user = userStore.getState().user;
        if (!user) {
            return;
        }
        const response = await getChatToken(this.chatId);
        if (!response) {
            return;
        }

        this.token = response;

        const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${user.id}/${this.chatId}/${this.token}`);
        this.socket = socket;
        socket.addEventListener('open', () => {
            setInterval(this.ping, 5000);
            socket.send(
                JSON.stringify({
                    content: '0',
                    type: 'get old'
                })
            );

            socket.addEventListener('close', (event) => {
                if (!event.wasClean) {
                    console.log('Обрыв соединения');
                }

                console.log(`Код: ${event.code} | Причина: ${event.reason}`);
            });

            socket.addEventListener('message', (event) => {
                const data: ChatMessagesResponse | ChatMessageData = JSON.parse(event.data);

                if (Array.isArray(data)) {
                    this.messages = data.filter((message) => message.type === 'message').reverse();
                } else {
                    if (data.type !== 'message') {
                        return;
                    }
                    this.messages = [...this.messages, data];
                }

                this.setMessages(this.messages);
            });

            socket.addEventListener('error', (event) => {
                console.log('Ошибка', event);
            });
        });
    }

    public sendMessage(value: string) {
        this.socket?.send(
            JSON.stringify({
                content: value,
                type: 'message'
            })
        );
    }

    private ping() {
        console.log('ping');
        this.socket?.send(
            JSON.stringify({
                type: 'ping'
            })
        );
    }
}

import { Block } from '@shared/utils';
import { messageReadIcon } from '../../../assets';

import template from '../template/chat-message.hbs?raw';
console.log(messageReadIcon);
type ChatMessageImg = {
    src: string;
    time: string;
    read?: boolean;
};

type ChatMessageImgProps = ChatMessageImg;

type ChatMessageText = {
    text: string;
    src: string;
    time: string;
    read?: boolean;
};

type ChatMessageTextProps = Omit<ChatMessageText, 'src'>;

const isChatMessageTextProps = (
    message: ChatMessageImgProps | ChatMessageTextProps
): message is ChatMessageTextProps => {
    return 'text' in message;
};
const isChatMessageImgProps = (message: ChatMessageImgProps | ChatMessageTextProps): message is ChatMessageImgProps => {
    return 'src' in message && 'time' in message && 'read' in message && Object.keys(message).length == 3;
};

export type ChatMessageProps = {
    content: ChatMessageImg | ChatMessageTextProps;
    owner: boolean;
};

export class ChatMessage extends Block {
    constructor({ content, owner }: ChatMessageProps) {
        let initProps:
            | {
                  messageImg: ChatMessageImg;
              }
            | {
                  messageText: ChatMessageText;
              }
            | undefined;

        if (isChatMessageTextProps(content)) {
            initProps = {
                messageText: {
                    text: content.text,
                    src: messageReadIcon,
                    time: content.time
                }
            };
        } else if (isChatMessageImgProps(content)) {
            initProps = {
                messageImg: {
                    src: content.src,
                    time: content.time
                }
            };
        } else {
            throw new Error('Unexpected message type');
        }

        super({
            ...initProps,
            owner,
            read: content.read
        });
    }

    override render() {
        return template;
    }
}

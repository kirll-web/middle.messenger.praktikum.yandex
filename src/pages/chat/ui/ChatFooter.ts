import { Block } from '@shared/utils';

import template from '../template/chat-footer.hbs?raw';
import { ChatFileButton } from './ChatFileButton';
import { ChatInput } from './ChatInput';
import { ChatSendButton } from './ChatSendButton';

export class ChatFooter extends Block {
    chatInput: ChatInput;
    constructor(onSendMessage: (value: string) => void) {
        const chatInput = new ChatInput();
        super({
            ChatFileButton: new ChatFileButton(),
            ChatInput: chatInput,
            ChatSendButton: new ChatSendButton(),
            events: {
                submit: (event: SubmitEvent) => {
                    event.preventDefault();

                    if (!chatInput.isValid()) {
                        return;
                    }

                    const form = event.target as HTMLFormElement;

                    onSendMessage(chatInput.getValue());
                    form.reset();
                }
            }
        });
        this.chatInput = chatInput;
    }

    override render() {
        return template;
    }
}

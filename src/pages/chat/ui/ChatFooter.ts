import { Block } from '@shared/utils';

import template from '../template/chat-footer.hbs?raw';
import { ChatFileButton } from './ChatFileButton';
import { ChatInput } from './ChatInput';
import { ChatSendButton } from './ChatSendButton';

export class ChatFooter extends Block {
    chatInput: ChatInput;
    constructor() {
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
                    const formData = new FormData(form);

                    const values = Object.fromEntries(formData.entries());

                    console.log(values);
                }
            }
        });
        this.chatInput = chatInput;
    }

    override render() {
        return template;
    }
}

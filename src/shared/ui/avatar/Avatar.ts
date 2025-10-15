import { Block, insertToObject } from '../../utils';
import template from './avatar.hbs?raw';

export type AvatarProps = {
    className?: string;
    src?: string;
    onClick?: () => void;
};

export class Avatar extends Block {
    constructor({ className, src, onClick }: AvatarProps) {
        super({
            ...insertToObject('className', className),
            ...insertToObject('hasAvatar', !!src),
            ...insertToObject('src', src),
            events: {
                click: onClick
            }
        });
    }

    override render() {
        return template;
    }
}

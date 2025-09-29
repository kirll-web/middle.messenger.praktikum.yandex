import { Block, insertToObject } from '../../utils';
import template from './avatar.hbs?raw';

export type AvatarProps = {
    id: string;
    name: string;
    availableTypes: string;
    className?: string;
    src?: string;
    hasAvatar?: boolean;
};

export class Avatar extends Block {
    constructor({ id, name, className, hasAvatar, src, availableTypes }: AvatarProps) {
        super({
            id,
            name,
            availableTypes,
            ...insertToObject('className', className),
            ...insertToObject('hasAvatar', hasAvatar),
            ...insertToObject('src', src)
        });
    }

    override render() {
        return template;
    }
}

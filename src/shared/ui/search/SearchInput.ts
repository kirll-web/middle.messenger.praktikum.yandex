import { Block } from '../../utils';
import template from './SearchInput.hbs?raw';

export type SearchInputProps = {
    inputId: string;
    onBlur: (event: FocusEvent) => void;
};

export class SearchInput extends Block {
    constructor({ inputId, onBlur }: SearchInputProps) {
        super({
            inputId,
            events: {
                blur: onBlur
            }
        });
    }

    override render() {
        return template;
    }
}

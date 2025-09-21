import { v1 as createId } from 'uuid';
import { searchIconSrc } from '../../../assets';
import { Block } from '../../utils';
import template from './search.hbs?raw';
import { SearchInput } from './SearchInput';

export type SearchProps = {
    name: string;
    placeholder?: string;
    icon?: string;
};

export class Search extends Block {
    constructor({ name, placeholder = 'Поиск', icon = searchIconSrc }: SearchProps) {
        const inputId = createId();
        const placeholderId = createId();
        super({
            name,
            placeholder,
            src: icon,
            placeholderId,
            SearchInput: new SearchInput({
                inputId,

                onBlur: (event: FocusEvent) => {
                    const target = event.target as HTMLInputElement;

                    if (!target.value) {
                        const placeholder = document.querySelector(
                            `[data-search-placeholder-id="${placeholderId}"]`
                        ) as HTMLElement | null;

                        target.classList.add('search__input_hidden');
                        placeholder?.classList.remove('search__placeholder_hidden');
                    }
                }
            }),
            events: {
                click: () => {
                    const input: HTMLInputElement | null = document.querySelector(
                        `[data-search-input-id="${inputId}"]`
                    );
                    const placeholder = document.querySelector(`[data-search-placeholder-id="${placeholderId}"]`);
                    input?.classList.remove('search__input_hidden');
                    placeholder?.classList.add('search__placeholder_hidden');
                    input?.focus();
                }
            }
        });
    }

    override render() {
        // console.log(template);
        return template;
    }
}

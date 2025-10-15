import { Block } from './Block';

export const render = (query: string, block: Block) => {
    const root = document.querySelector(query);

    if (!root) {
        throw new Error(`No root found for selector "${query}"`);
    }
    root.replaceChildren();
    root.appendChild(block.getContent());
    block.show();
    block.dispatchComponentDidMount();

    return root;
};

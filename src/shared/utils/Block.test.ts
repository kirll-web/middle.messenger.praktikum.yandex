// eslint-disable-next-line import/order
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Block } from './Block';

const TEST_BLOCK_ID = 'testBlock';
const TEST_BLOCK_WITH_CHILD_ID = 'testBlockWithChild';
const TEST_BLOCK_WITH_LISTS_ID = 'testBlockWithChild';

class TestBlock extends Block {
    private static template = `<div  data-id="${TEST_BLOCK_ID}">{{text}}</div>`;
    private static text = 'Hello World';

    constructor() {
        super({
            text: TestBlock.text
        });
    }

    override render() {
        return TestBlock.template;
    }
}

class TestBlockWithChild extends Block {
    private static template = `<div data-id="${TEST_BLOCK_WITH_CHILD_ID}">{{{TestBlock}}}</div>`;

    constructor() {
        super({
            TestBlock: new TestBlock()
        });
    }

    override render() {
        return TestBlockWithChild.template;
    }
}

class TestBlockWithLists extends Block {
    private static template = `<div data-id="${TEST_BLOCK_WITH_LISTS_ID}">{{{testBlocks}}}</div>`;

    constructor() {
        super({
            testBlocks: [new TestBlock(), new TestBlock(), new TestBlock()]
        });
    }

    override render() {
        return TestBlockWithLists.template;
    }
}

class TestBlockWithEvent extends Block {
    private static template = `<div data-id="${TEST_BLOCK_ID}">{{text}}</div>`;
    private static text = 'Hello World';

    constructor(onClick: () => void) {
        super({
            text: TestBlockWithEvent.text,
            events: {
                click: onClick
            }
        });
    }

    override render() {
        return TestBlockWithEvent.template;
    }
}

describe('Block rendering', () => {
    let root: HTMLElement;

    beforeEach(() => {
        document.body.innerHTML = ''; // очищаем DOM перед каждым тестом
        root = document.createElement('div');
        document.body.append(root);
    });

    it('должен рендерить простой блок с текстом', () => {
        const block = new TestBlock();
        root.append(block.getContent());

        const el = document.querySelector(`[data-id="${TEST_BLOCK_ID}"]`);
        expect(el).not.toBeNull();
        expect(el?.textContent).toBe('Hello World');
    });

    it('должен рендерить блок с дочерним компонентом', () => {
        const parent = new TestBlockWithChild();
        root.append(parent.getContent());

        const parentEl = document.querySelector(`[data-id="${TEST_BLOCK_WITH_CHILD_ID}"]`);
        const childEl = document.querySelector(`[data-id="${TEST_BLOCK_ID}"]`);

        expect(parentEl).not.toBeNull();
        expect(childEl).not.toBeNull();
        expect(childEl?.textContent).toBe('Hello World');
        expect(parentEl?.contains(childEl!)).toBe(true);
    });

    it('должен рендерить блок со списком дочерних компонентов', () => {
        const listBlock = new TestBlockWithLists();
        root.append(listBlock.getContent());

        const parentEl = document.querySelector(`[data-id="${TEST_BLOCK_WITH_LISTS_ID}"]`);
        const children = parentEl?.querySelectorAll(`[data-id="${TEST_BLOCK_ID}"]`);

        expect(parentEl).not.toBeNull();
        expect(children?.length).toBe(3);

        children?.forEach((child) => {
            expect(child.textContent).toBe('Hello World');
        });
    });

    it('должен вызывать обработчик onClick при клике', () => {
        const handleClick = vi.fn();
        const block = new TestBlockWithEvent(handleClick);

        root.append(block.getContent());

        const el = document.querySelector(`[data-id="${TEST_BLOCK_ID}"]`);
        expect(el).not.toBeNull();

        el!.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});

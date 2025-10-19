// eslint-disable-next-line import/order
import { MockRoute } from './RouterMocks';

vi.mock('./Route', () => {
    return { Route: MockRoute };
});

import { Block } from './Block';
import { Router } from './Router';

// eslint-disable-next-line import/order
import { beforeEach, describe, expect, it, vi } from 'vitest';

class MockBlock extends Block {}

describe('Тестирование Router', () => {
    let router = new Router();

    beforeEach(async () => {
        router.reset();

        router = new Router('#app');
        window.history.pushState({}, '', '/');
    });

    it('должен возвращать один и тот же экземпляр (паттерн Singleton)', () => {
        const r1 = new Router('#app');
        const r2 = new Router('#another');

        expect(r1).toBe(r2);
    });

    it('при переходе по go с существующим  currentRoutePath должен измениться ', () => {
        router.use('/', MockBlock);
        router.use('/a', MockBlock);
        router.use('/b', MockBlock);
        router.start();

        router.go('/a');

        expect(router.currentRoutePath).toBe('/a');
    });

    it('при переходе по go с несуществующим  currentRoutePath должен оставаться неизменным ', () => {
        router.use('/', MockBlock);

        router.start();
        router.go('/a');

        expect(router.currentRoutePath).toBe('/');
    });

    it('при вызове back, router должен вернуться обратно', () => {
        router.use('/', MockBlock);
        router.use('/a', MockBlock);
        router.use('/b', MockBlock);
        router.start();

        router.go('/a');
        router.go('/b');

        router.back();

        //имитация вызова оnpopstate, т.к. в vitest он не работает при вызове window.history.back
        router._onRoute('/a');

        expect(router.currentRoutePath).toBe('/a');

        router.back();
        //имитация вызова оnpopstate, т.к. в vitest он не работает при вызове window.history.back
        router._onRoute('/');

        expect(router.currentRoutePath).toBe('/');
    });

    it('при вызове forward, router должен вернуться вперёд', () => {
        router.use('/', MockBlock);
        router.use('/a', MockBlock);
        router.use('/b', MockBlock);
        router.start();
        router.go('/a');
        router.go('/b');
        router.back();
        //имитация вызова оnpopstate, т.к. в vitest он не работает при вызове window.history.back
        router._onRoute('/a');

        router.forward();
        //имитация вызова оnpopstate, т.к. в vitest он не работает при вызове window.history.back
        router._onRoute('/b');

        expect(router.currentRoutePath).toBe('/b');
    });
});

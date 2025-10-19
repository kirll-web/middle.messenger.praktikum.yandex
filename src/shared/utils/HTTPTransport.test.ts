import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { HTTPTransport, METHODS, isApiResponseError, isApiResponseSuccess } from './HTTPTransport';

// ---------- мок XMLHttpRequest ----------
class MockXHR {
    static instances: MockXHR[] = [];

    status = 200;
    response = '{"ok":true}';
    withCredentials = false;
    readyState = 4;
    headers: Record<string, string> = {};

    onload?: () => void;
    onabort?: () => void;
    onerror?: () => void;
    ontimeout?: () => void;

    open = vi.fn();
    setRequestHeader = vi.fn((key: string, value: string) => {
        this.headers[key] = value;
    });
    send = vi.fn(() => {
        queueMicrotask(() => this.onload?.());
    });
    abort = vi.fn(() => {
        this.status = 0;
        this.onabort?.();
    });

    constructor() {
        MockXHR.instances.push(this);
    }
}

describe('HTTPTransport', () => {
    let OriginalXHR: typeof XMLHttpRequest;

    beforeEach(() => {
        //@ts-expect-error подменяем конструктор, чтобы использовать этот экземпляр
        OriginalXHR = global.XMLHttpRequest;
        //@ts-expect-error подменяем конструктор, чтобы использовать этот экземпляр
        global.XMLHttpRequest = MockXHR;
        MockXHR.instances = [];
    });

    afterEach(() => {
        //@ts-expect-error подменяем конструктор, чтобы использовать этот экземпляр
        global.XMLHttpRequest = OriginalXHR;
    });

    it('должен отправлять GET-запрос с query-параметрами', async () => {
        const promise = HTTPTransport.get<{ ok: boolean }>('https://test.api/resource', {
            data: { a: 1, b: 'x' }
        });

        const xhr = MockXHR.instances[0];
        expect(xhr.open).toHaveBeenCalledWith(METHODS.GET, 'https://test.api/resource?a=1&b=x');
        await expect(promise).resolves.toEqual({ data: { ok: true } });
    });

    it('должен отправлять POST-запрос с JSON телом', async () => {
        const data = { login: 'user', password: 'pass' };
        const promise = HTTPTransport.post('https://test.api/login', { data });
        const xhr = MockXHR.instances[0];

        await promise;
        expect(xhr.open).toHaveBeenCalledWith(METHODS.POST, 'https://test.api/login');
        expect(xhr.send).toHaveBeenCalledWith(JSON.stringify(data));
        expect(xhr.headers['Content-Type']).toContain('application/json');
    });

    it('должен отклонять промис при статусе != 200', async () => {
        const xhr = new MockXHR();
        xhr.status = 500;
        xhr.response = 'Internal error';

        //@ts-expect-error подменяем конструктор, чтобы использовать этот экземпляр
        global.XMLHttpRequest = vi.fn(() => xhr);

        const promise = HTTPTransport.get('https://test.api/error');

        queueMicrotask(() => xhr.onload?.());

        await expect(promise).rejects.toEqual({
            error: 'Internal error',
            code: 500
        });
    });

    it('isApiResponseSuccess и isApiResponseError работают корректно', () => {
        const success = { data: { a: 1 } };
        const error = { error: 'fail', code: 400 };

        expect(isApiResponseSuccess(success)).toBe(true);
        expect(isApiResponseSuccess(error)).toBe(false);
        expect(isApiResponseError(error)).toBe(true);
        expect(isApiResponseError(success)).toBe(false);
    });
});

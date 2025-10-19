import { vi } from 'vitest';

export class MockRoute {
    pathname: string;
    render = vi.fn();
    leave = vi.fn();
    constructor(pathname: string) {
        this.pathname = pathname;
    }
    match(path: string) {
        return path === this.pathname;
    }
}

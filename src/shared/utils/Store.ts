import { EventBus } from './EventBus';
import set from './set';

type Indexed<T = unknown> = {
    [key in string]: T;
};

export enum StoreEvents {
    Updated = 'updated'
}

export class Store<T extends Indexed> extends EventBus {
    protected state: T = {} as T;

    public getState() {
        return new Proxy(this.state, {
            set() {
                throw new Error('Modification not allowed');
            }
        });
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);
        this.emit(StoreEvents.Updated);
    }
}

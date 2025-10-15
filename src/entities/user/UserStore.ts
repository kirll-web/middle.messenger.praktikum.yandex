import { Store } from '@shared/utils';

import { getUser } from './lib/getUser';
import { User } from './types';

type UserStoreState = {
    user?: User;
};

class UserStore extends Store<UserStoreState> {
    override state: UserStoreState = { user: undefined };

    constructor() {
        super();

        getUser().then((user) => {
            if (!user) {
                this.set('user', undefined);
            }

            this.set('user', user);
        });
    }
}

export default new UserStore();

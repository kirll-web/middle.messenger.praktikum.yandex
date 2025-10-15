import { isApiResponseSuccess } from '@shared/utils';

import { getUserRequest } from '../api/api';
import { User } from '../types';
import { map } from './mapper';

export const getUser = (): Promise<User | undefined> =>
    getUserRequest()
        .then((response) => {
            if (isApiResponseSuccess(response)) {
                return map(response.data);
            }
            return undefined;
        })
        .catch(() => {
            return undefined;
        });

import { getUser } from '@entities/user';
import { RoutePath } from '@shared/lib';
import { Modal } from '@shared/ui/Modal';
import { Back } from '@shared/ui/back';
import { Block, Router } from '@shared/utils';

import template from '../template/profile.hbs?raw';
import './Profile.scss';
import { getChangeProfileAvatarModal, ProfileForm } from './ProfileForm';

export type ProfileType = 'view' | 'edit' | 'changePassword';

type Props = {
    ProfileForm: ProfileForm;
    Back: Back;
    Modal: Modal;
};

export class ProfilePage extends Block<Props> {
    constructor() {
        super();

        getUser().then((user) => {
            if (!user) {
                new Router().go(RoutePath.Auth);
                return;
            }

            const initProps: Props = {
                ProfileForm: new ProfileForm({ type: 'view', user }),
                Back: new Back(),
                Modal: new Modal(getChangeProfileAvatarModal(() => {}))
            };

            this.setProps({
                ...initProps
            });
        });
    }

    override render(): string {
        return template;
    }
}

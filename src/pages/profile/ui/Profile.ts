import { Navbar } from '@shared/ui';
import { Block } from '@shared/utils';

import template from '../template/profile.hbs?raw';
import './Profile.scss';
import { ProfileForm } from './ProfileForm';

export type ProfileType = 'view' | 'edit' | 'changePassword';

export type ProfilePageProps = {
    type: ProfileType;
    Navbar: Navbar;
};

type Props = Omit<ProfilePageProps, 'type'> & {
    ProfileForm: ProfileForm;
};

export class ProfilePage extends Block<Props> {
    constructor({ Navbar, type }: ProfilePageProps) {
        super();

        const initProps: Props = {
            ProfileForm: new ProfileForm({ type }),
            Navbar: Navbar
        };

        this.setProps({
            ...initProps
        });
    }

    override render(): string {
        return template;
    }
}

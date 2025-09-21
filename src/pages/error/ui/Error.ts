import { Link } from '@shared/ui/link';
import { Block } from '@shared/utils';

import template from '../template/error.hbs?raw';
import { Navbar } from './../../../shared/ui/nav/Navbar';
import './Error.scss';

export type ErrorPageProps = {
    title: string;
    description: string;
    LinkBack: Link;
    Navbar: Navbar;
};

export class ErrorPage extends Block {
    constructor({ title, description, LinkBack, Navbar }: ErrorPageProps) {
        super({ title, description, LinkBack, Navbar });
    }

    override render() {
        return template;
    }
}

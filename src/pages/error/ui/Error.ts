import { Link } from '@shared/ui/link';
import { Block } from '@shared/utils';

import template from '../template/error.hbs?raw';
import './Error.scss';

export type ErrorPageProps = {
    title: string;
    description: string;
    LinkBack: Link;
};

export class ErrorPage extends Block {
    constructor({ title, description, LinkBack }: ErrorPageProps) {
        super({ title, description, LinkBack });
    }

    override render() {
        return template;
    }
}

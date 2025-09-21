import { Block } from '@shared/utils';
import { Link } from '../link';
import template from './navbarBlock.hbs?raw';

export type NavbarLink = {
    text: string;
    href: string;
    className?: string;
    onClick?(): unknown;
};

export type NavbarProps = {
    links: NavbarLink[];
};

export class Navbar extends Block {
    constructor({ links }: NavbarProps) {
        super({
            links: links.map(
                ({ text, href, className, onClick }: NavbarLink) =>
                    new Link({
                        text,
                        href,
                        className: `navbar__link ${className}`,
                        onClick: onClick
                    })
            )
        });
    }

    override render() {
        return template;
    }
}

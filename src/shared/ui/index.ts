import Handlebars from 'handlebars';

import Avatar from './avatar/avatar.hbs?raw';
import Button from './button/button.hbs?raw';
import Form from './form/form.hbs?raw';
import Input from './input/input.hbs?raw';

import ProfileField from './profile/profile-field.hbs?raw';

const registrComponents = () => {
    Handlebars.registerPartial('Avatar', Avatar);
    Handlebars.registerPartial('Input', Input);
    Handlebars.registerPartial('Form', Form);
    Handlebars.registerPartial('Button', Button);
    Handlebars.registerPartial('ProfileField', ProfileField);
    Handlebars.registerHelper('log', function (something) {
        console.log(something);
    });
    Handlebars.registerHelper('or', function () {
        const args = Array.prototype.slice.call(arguments, 0, -1);
        return args.some((arg) => !!arg);
    });
};

export { Avatar } from './avatar/Avatar';
export { Button } from './button/Button';
export { Form } from './form/Form';
export { Input } from './input/Input';
export { Link } from './link';
export { Navbar } from './nav/Navbar';
export { PopupMenu } from './popup-menu/PopupMenu';
export { PopupMenuButton } from './popup-menu/PopupMenuButton';
export { ProfileField } from './profile/ProfileField';
export { Search } from './search/Search';
export { AbstractSvgIcon } from './svg-icon/AbstractSvgIcon';
export { registrComponents };

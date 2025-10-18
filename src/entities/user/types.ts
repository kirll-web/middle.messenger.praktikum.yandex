import { UserDto } from './api/dto';

export type User = {
    id: number;
    firstName: string;
    secondName: string;
    displayName: string;
    phone: string;
    login: string;
    avatar: string;
    email: string;
};

export type UserData = Omit<UserDto, 'id' | 'avatar'>;

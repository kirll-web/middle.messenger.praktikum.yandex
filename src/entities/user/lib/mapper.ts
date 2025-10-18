import { UserDto } from '../api/dto';
import { User } from '../types';

export const map = (dto: UserDto): User => ({
    ...dto,
    firstName: dto.first_name,
    secondName: dto.second_name,
    displayName: dto.display_name
});

export enum RoutePath {
    Error404 = 'error-404',
    Error500 = 'error-500',
    Registration = '/sign-up',
    Auth = '/',
    Profile = '/settings',
    EditProfile = 'edit-profile',
    ChangePassword = 'change-password',
    Chat = '/messenger'
}

export const AvailableTypes = {
    Jpeg: 'image/jpeg',
    Png: 'image/png'
} as const;

export const availableTypes = Object.values(AvailableTypes).join(',');

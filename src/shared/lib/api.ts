export const API_BASE_URL = 'https://ya-praktikum.tech/api/v2';
export const API_RESOURCES_URL = 'https://ya-praktikum.tech/api/v2/resources';

export const buildImageLink = (path: string) => `${API_RESOURCES_URL}${path}`;

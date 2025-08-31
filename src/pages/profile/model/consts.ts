const AvailableTypes = {
    Jpeg: 'image/jpeg',
    Png: 'image/png'
} as const;

export const availableTypes = Object.values(AvailableTypes).join(',');

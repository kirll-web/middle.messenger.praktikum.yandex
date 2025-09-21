export const insertToObject = <T extends string | number | symbol, U = unknown>(name: T, value?: U) => {
    return value !== undefined ? { [name]: value } : {};
};

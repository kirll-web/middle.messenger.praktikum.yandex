type Indexed<T = unknown> = {
    [key in string]: T;
};

const isObject = (value: unknown): value is Indexed => {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return true;
    }
    return false;
};

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (!isObject(object)) {
        return object;
    }

    if (typeof path !== 'string') {
        throw new TypeError('path must be string');
    }

    const pathParts = path.split('.');

    const [head, ...tail] = pathParts;

    if (tail.length === 0) {
        object[head] = value;
        return object;
    }

    const newPath = tail.join('.');

    if (head in object) {
        return set(object[head], newPath, value);
    }

    object[head] = {};
    set(object[head], newPath, value);

    return object;
}

export default set;

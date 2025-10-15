type Indexed<T = unknown> = {
    [key in string]: T;
};

const isObject = (value: unknown): value is Indexed => {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return true;
    }
    return false;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
    const result: Indexed = {};

    for (const key in lhs) {
        if (Object.prototype.hasOwnProperty.call(lhs, key)) {
            if (isObject(lhs[key]) && isObject(rhs[key])) {
                result[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
            } else {
                result[key] = lhs[key];
            }
        }
    }

    for (const key in rhs) {
        if (Object.prototype.hasOwnProperty.call(rhs, key)) {
            if (!(key in lhs)) {
                result[key] = rhs[key];
            } else if (isObject(lhs[key]) && isObject(rhs[key])) {
                continue;
            } else {
                result[key] = rhs[key];
            }
        }
    }

    return result;
}

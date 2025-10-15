type PlainObject<T = any> = {
    [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
    return (
        typeof value === 'object' &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === '[object Object]'
    );
}

function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
    return isPlainObject(value) || isArray(value);
}

function cloneDeep<T extends object = PlainObject>(obj: PlainObject): PlainObject {
    if (isArray(obj)) {
        const newArr = [];

        for (let i = 0; i < obj.length; i++) {
            if (isArrayOrObject(obj[i])) {
                newArr[i] = cloneDeep(obj[i]);
                continue;
            }

            newArr[i] = obj[i];
        }
        return newArr;
    }

    const newObj: PlainObject = {};

    for (const [key, value] of Object.entries(obj)) {
        if (isArrayOrObject(value)) {
            newObj[key] = cloneDeep(value);
            continue;
        }

        newObj[key] = value;
    }

    return newObj;
}

export default cloneDeep;

const objects = [{ a: 1 }, { b: 2 }];
const deep = cloneDeep(objects);

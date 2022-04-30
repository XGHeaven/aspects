export function renderValue(value) {
    switch (typeof value) {
        case 'string':
            return value;
        case 'bigint':
        case 'number':
            return String(value);
        case 'symbol':
        case 'undefined':
        case 'object':
        case 'function':
        case 'boolean':
            return '';
    }
}

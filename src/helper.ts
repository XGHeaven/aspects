export function renderValue(value: unknown) {
  switch(typeof value) {
    case 'string':
      return value
    case 'bigint':
    case 'number':
      return String(value)
    case 'symbol':
    case 'undefined':
    case 'object':
    case 'function':
    case 'boolean':
      return ''
  }
}

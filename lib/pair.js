const distinguish = Symbol.for('aspects-pair');
export const ElementPairType = 0;
export const ExprPairType = 1;
export const ConditionPairType = 2;
export function element(name, props = {}, children = []) {
    return {
        [distinguish]: true,
        type: ElementPairType,
        name,
        props,
        children
    };
}
export function expr(deps, expr) {
    return {
        [distinguish]: true,
        type: ExprPairType,
        deps,
        expr,
    };
}
export function condition(cases = [], fallback = []) {
    return {
        [distinguish]: true,
        type: ConditionPairType,
        cases,
        fallback,
    };
}

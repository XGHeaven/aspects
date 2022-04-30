const distinguish = Symbol.for('aspects-pair')

export const ElementPairType = 0
export const ExprPairType = 1
export const ConditionPairType = 2

export type ElementPropType = StaticOrExprPair<unknown>
export type ElementProps = Record<string, ElementPropType>
export type ElementChild = Pair | string
export type ElementChildren = ElementChild[]

export interface ElementPair {
  [distinguish]: true
  type: typeof ElementPairType
  // TODO: 这里可能要换成对应的自定义组件
  name: string
  props: ElementProps
  children: ElementChildren
}

export function element(name: string, props: ElementPropType = {}, children: any[] = []): ElementPair {
  return {
    [distinguish]: true,
    type: ElementPairType,
    name,
    props,
    children
  }
}

export type ExprDepType = string
export type ExprDepsType = ExprDepType[]
export type ExprFunction = (data: unknown) => unknown

export interface ExprPair {
  [distinguish]: true,
  type: typeof ExprPairType,
  deps: ExprDepsType
  expr: ExprFunction
}

export function expr(deps: ExprDepsType, expr: ExprFunction): ExprPair {
  return {
    [distinguish]: true,
    type: ExprPairType,
    deps,
    expr,
  }
}

export interface ConditionPair {
  [distinguish]: true,
  type: typeof ConditionPairType,
  cases: [][],
  fallback: any[]
}

export function condition(cases: any[] = [], fallback: any[] = []): ConditionPair {
  return {
    [distinguish]: true,
    type: ConditionPairType,
    cases,
    fallback,
  }
}

export type Pair = ElementPair | ConditionPair | ExprPair
export type StaticOrExprPair<T = unknown> = T | ExprPair

export type Template = ElementChildren


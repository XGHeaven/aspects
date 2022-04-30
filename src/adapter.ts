import { ComponentModal } from "./component"

export interface Adapter<T = unknown, M> {
  createElement: (name: string) => T
  createText: (str: string) => T
  createAnchor: () => T
  setText: (text: T, str: string) => void
  insert: (element: T, child: T, anchor: T | null) => void

  createModel: (type: M) => ComponentModal
}

export function setAdaptar<T>(newAdapter: Adapter<T>) {
  adapter = newAdapter as Adapter<unknown>
}

export let adapter: Adapter<unknown>

/**
 * class App {
 *   static template = []
 *   sta tic {
 *     this.template = [Wrap(App).handler, WrapFn(() => {})]
 *   }
 *   constructor() {
 *     onMounted(this, () => {})
 *     update(this, this.data) // first init data
 *     onUnmount(this, () => {})
 *   }
 *
 *   check() {
 *     update(this, this.data, [['a', 'b']])
 *   }
 *
 *   handler() {}
 * }
 *
 */

import { Template } from ".";

export interface ComponentModal {
  create: () => void
  update: () => void
  destroy: () => void
}

abstract class Component {
  static readonly template: Template
}

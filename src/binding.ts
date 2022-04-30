import { adapter } from "./adapter";
import { Context } from "./context";
import { renderValue } from "./helper";
import { ElementChild, ElementPairType, ExprPair, ExprPairType, Template } from "./pair";

export interface CoreBinding {
  create: (data: unknown, ctx: Context) => void
  update: (data: unknown, ctx: Context) => void
  destroy: () => void
}

export interface StructualBinding extends CoreBinding {
  mount: (target: unknown, anchor: unknown) => void
}

export type Binding = ElementBinding | PropBinding | EventBinding

export class PropBinding implements CoreBinding {

}

export class EventBinding implements CoreBinding {

}

export class TextBinding implements CoreBinding {
  constructor(private pair: ExprPair, private text: unknown) {}

  create(data) {
    adapter.setText(this.text, renderValue(this.pair.expr(data)))
  }

  update(data) {
    // TODO: cache current value
    adapter.setText(this.text, renderValue(this.pair.expr(data)))
  }

  destroy() {}
}

export class ElementBinding implements StructualBinding {
  private bindings: Binding[] = []
  private elements: unknown[] = []
  constructor(private template: Template) {
  }

  create(data: unknown, ctx: Context) {
    const { template } = this
    for (let i = 0, len = template.length; i < len; i++) {
      this.elements.push(this.clone(template[i]))
    }
  }

  mount(target: unknown, anchor: unknown) {
    const { elements } = this
    for (let i = 0; i < elements.length; i++) {
      adapter.insert(target, elements[i], anchor)
    }
  };

  private clone(child: ElementChild) {
    if (typeof child === 'string') {
      return adapter.createText(child)
    }

    switch(child.type) {
      case ElementPairType: {
        const {name, props, children} = child

        const element = adapter.createElement(name)

        for (const propKey in props) {
          const propValue = props[propKey]
          // TODO
        }

        const len = children.length
        if (len) {
          for (let i = 0; i < len; i++) {
            const anchor = adapter.createAnchor()
            adapter.insert(element, anchor, null)
            adapter.insert(element, this.clone(children[i]), anchor)
          }
        }
        return element
      }

      case ExprPairType: {
        const text = adapter.createText('')
        const binding = new TextBinding(child, text)
        this.bindings.push(binding)
        return text
      }
    }
  }
}

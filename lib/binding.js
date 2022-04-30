import { adapter } from "./adapter";
import { renderValue } from "./helper";
import { ElementPairType, ExprPairType } from "./pair";
export class PropBinding {
}
export class EventBinding {
}
export class TextBinding {
    constructor(pair, text) {
        this.pair = pair;
        this.text = text;
    }
    create(data) {
        adapter.setText(this.text, renderValue(this.pair.expr(data)));
    }
    update(data) {
        // TODO: cache current value
        adapter.setText(this.text, renderValue(this.pair.expr(data)));
    }
    destroy() { }
}
export class ElementBinding {
    constructor(template) {
        this.template = template;
        this.bindings = [];
        this.elements = [];
    }
    create(data, ctx) {
        const { template } = this;
        for (let i = 0, len = template.length; i < len; i++) {
            this.elements.push(this.clone(template[i]));
        }
    }
    clone(child) {
        if (typeof child === 'string') {
            return adapter.createText(child);
        }
        switch (child.type) {
            case ElementPairType: {
                const { name, props, children } = child;
                const element = adapter.createElement(name);
                for (const propKey in props) {
                    const propValue = props[propKey];
                    // TODO
                }
                const len = children.length;
                if (len) {
                    for (let i = 0; i < len; i++) {
                        const anchor = adapter.createAnchor();
                        adapter.insert(element, anchor, null);
                        adapter.insert(element, this.clone(children[i]), anchor);
                    }
                }
                return element;
            }
            case ExprPairType: {
                const text = adapter.createText('');
                const binding = new TextBinding(child, text);
                this.bindings.push(binding);
                return text;
            }
        }
    }
}

import { setAdaptar } from '../src/adapter'
import { ElementBinding } from '../src/index'

setAdaptar<HTMLElement | Text>({
  createElement(name) {
    return document.createElement(name)
  },
  createAnchor() {
    return document.createTextNode('')
  },
  createText(text) {
    return document.createTextNode(text)
  },
  setText(text, str) {
    text.textContent = str
  },
  insert(target, element, anchor) {
    target.insertBefore(element, anchor)
  }
})

describe('normal', () => {
  it('test', () => {
    const root = document.createElement('div')
    const binding = new ElementBinding([
      'a',
      'b'
    ])
    binding.create({}, {})
    binding.mount(root, null)
    expect(root.textContent).toBe('ab')
  })
})

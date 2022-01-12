import Prop from './Prop'
import Visibility from '../visibility/Visibility'
import { Printable, PrintOptions } from './types'

interface GroupOptions {
  visibility?: Visibility
}

export default class Group implements Printable {
  children: (Group | Prop)[]
  visibility: Visibility

  constructor(children: (Group | Prop)[], { visibility }: GroupOptions = {}) {
    this.children = children
    this.visibility = visibility || new Visibility()
  }

  print({
    showHidden = false,
    context,
  }: PrintOptions = {}): string {
    let thisPrint = '|-- _group\n'

    if (!this.visibility.isVisible(context)) {
      if (showHidden) {
        thisPrint = '|-- [_group] (hidden)\n'
      } else {
        return ''
      }
    }

    const children = this.children.reduce((prev, current) => {
      let currentPrint = current.print({ showHidden, context })

      const lines = currentPrint.split('\n')
      currentPrint = lines.reduce((prevLine, currentLine) => {
        if (currentLine.replace(/ /g, '').length === 0) return prevLine
        return `${prevLine}    ${currentLine}\n`
      }, '')

      if (currentPrint.length === 0) return prev
      return `${prev}${currentPrint}`
    }, '')

    return thisPrint + children
  }
}

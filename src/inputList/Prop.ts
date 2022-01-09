import { Inputs } from '@pmirau/lib--react-form'
import Visibility from '../visibility/Visibility'
import { Printable, PrintOptions } from './types'

interface PropOptions {
  visibility?: Visibility
}

export default class Prop implements Printable {
  input: Inputs
  visibility: Visibility

  constructor(input: Inputs, { visibility }: PropOptions = {}) {
    this.input = input
    this.visibility = visibility || new Visibility()
  }

  /**
   * Print the id of the input when this prop is visible (Created for debug purposes)
   */
  print({
    showHidden = false,
    context,
  }: PrintOptions = {}): string {
    if (this.visibility.isVisible(context)) {
      return `|-- ${this.input.id}`
    }

    if (showHidden) {
      return `|-- [${this.input.id}] (hidden)`
    }

    return ''
  }
}

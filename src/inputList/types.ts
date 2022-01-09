import { ConditionalContext } from '../types'

export interface PrintOptions {
  context?: ConditionalContext
  // prints the input-id marked as 'hidden' instead of an empty string
  showHidden?: boolean
}

export interface Printable {
  print(options: PrintOptions): string
}

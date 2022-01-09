import Visibility from '../../src/visibility/Visibility'
import {
  contextFalse,
  contextTrue,
  hiddenOn,
} from '../../src/__example__/data/visibility/visibility'
import { inputText1 } from '../../src/__example__/data/inputList/inputs'
import Prop from '../../src/inputList/Prop'

describe('Prop', () => {
  let prop: Prop
  let visibility: Visibility
  beforeEach(() => {
    visibility = new Visibility({ hiddenOn })
    prop = new Prop(inputText1, { visibility })
  })

  it('initializes correctly', () => {
    expect(prop).toEqual({
      input: inputText1,
      visibility,
    })
  })

  it('prints the input id based on an optional context', () => {
    // Prints when visible
    expect(prop.print()).toBe(`|-- ${inputText1.id}`)
    expect(prop.print({ context: contextFalse })).toBe(`|-- ${inputText1.id}`)
    expect(prop.print({ context: contextTrue })).toBe('')
    expect(prop.print({ context: contextTrue, showHidden: true })).toBe(`|-- [${inputText1.id}] (hidden)`)
  })
})

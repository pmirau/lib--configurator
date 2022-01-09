import Visibility from '../../src/visibility/Visibility'
import { contextTrue, hiddenOn } from '../../src/__example__/data/visibility/visibility'
import { inputNumber1, inputText1 } from '../../src/__example__/data/inputList/inputs'
import Prop from '../../src/inputList/Prop'
import Group from '../../src/inputList/Group'

// TODO Maybe require at least on child in Group, as I have specified that the leaf must always be
//  a prop (in README.md)

// TODO: Insert / Remove / ChangeOrder for backend

let propWithoutVisibility: Prop
let propWithVisibility: Prop
let visibilityHiddenOn: Visibility
let group: Group
const pathVisible = ''
  + '|-- _group\n'
  + '    |-- number-1\n'
  + '    |-- _group\n'
  + '        |-- text-1\n'
  + '        |-- number-1\n'
  + '        |-- _group\n'
  + '            |-- number-1\n'
  + '            |-- number-1\n'
  + '    |-- number-1\n'
  + '    |-- number-1\n'

const pathHidden = ''
  + '|-- _group\n'
  + '    |-- number-1\n'
  + '    |-- _group\n'
  + '        |-- number-1\n'
  + '    |-- number-1\n'
  + '    |-- number-1\n'

const pathHiddenWithOption = ''
  + '|-- _group\n'
  + '    |-- number-1\n'
  + '    |-- _group\n'
  + '        |-- [text-1] (hidden)\n'
  + '        |-- number-1\n'
  + '        |-- [_group] (hidden)\n'
  + '            |-- number-1\n'
  + '            |-- number-1\n'
  + '    |-- number-1\n'
  + '    |-- number-1\n'

beforeEach(() => {
  visibilityHiddenOn = new Visibility({ hiddenOn })
  propWithVisibility = new Prop(inputText1, { visibility: visibilityHiddenOn })
  propWithoutVisibility = new Prop(inputNumber1)

  group = new Group([
    propWithoutVisibility,
    new Group([
      propWithVisibility,
      propWithoutVisibility,
      new Group([
        propWithoutVisibility,
        propWithoutVisibility,
      ], {
        visibility: visibilityHiddenOn,
      }),
    ]),
    propWithoutVisibility,
    propWithoutVisibility,
  ])
})

describe('Group', () => {
  it('initializes correctly', () => {
    // Not client usage - Maybe make children private to prevent using the group accidentally like
    // the following
    expect(group).toEqual({
      children: [
        propWithoutVisibility,
        {
          children: [
            propWithVisibility,
            propWithoutVisibility,
            {
              children: [
                propWithoutVisibility,
                propWithoutVisibility,
              ],
              visibility: visibilityHiddenOn,
            },
          ],
          visibility: new Visibility(),
        },
        propWithoutVisibility,
        propWithoutVisibility,
      ],
      visibility: new Visibility(),
    })
  })

  it('prints basic group (without context)', () => {
    // console.log(group.print({ context: contextTrue }))
    expect(group.print()).toBe(pathVisible)
    expect(group.print({ context: contextTrue })).toBe(pathHidden)
    expect(group.print({ context: contextTrue, showHidden: true })).toBe(pathHiddenWithOption)
  })
})

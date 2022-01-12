import stepOsc from '../../src/__example__/data/inputList/synth/stepOsc.json'
import path1Context from '../../src/__example__/data/inputList/synth/context/path1.json'
import path2Context from '../../src/__example__/data/inputList/synth/context/path2.json'
import path3Context from '../../src/__example__/data/inputList/synth/context/path3.json'
import { path1, path2, path3 } from '../../src/__example__/data/inputList/synth/paths'
import Group from '../../src/inputList/Group'
import GroupFactory from '../../src/factories/GroupFactory'
import { GroupPOJO } from '../../src/types'

describe('GroupFactory', () => {
  it('creates a group with children from a plain data source', () => {
    const groupFactory = new GroupFactory(stepOsc as GroupPOJO)
    const group: Group = groupFactory.createGroup()

    expect(group.print({ showHidden: true, context: path1Context }))
      .toEqual(path1)
    expect(group.print({ showHidden: true, context: path2Context }))
      .toEqual(path2)
    expect(group.print({ showHidden: true, context: path3Context }))
      .toEqual(path3)
  })
})

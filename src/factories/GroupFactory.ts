import { GroupPOJO, PropPOJO } from '../types'
import Group from '../inputList/Group'
import Prop from '../inputList/Prop'
import Visibility from '../visibility/Visibility'

export default class GroupFactory {
  dataSource: GroupPOJO

  /**
   * @param dataSource - from which the group will be build
   */
  constructor(dataSource: GroupPOJO) {
    this.dataSource = dataSource
  }

  createGroup() {
    return new Group(
      this.#createChildren(this.dataSource.children),
      {
        visibility: GroupFactory.#createVisibility(this.dataSource),
      },
    )
  }

  // Recursively create instances of all children of a group
  #createChildren(childrenPOJO: (GroupPOJO | PropPOJO)[]): (Group | Prop)[] {
    return childrenPOJO.map((childPOJO) => {
      if (childPOJO.type === 'prop') {
        return new Prop(childPOJO.input, {
          visibility: GroupFactory.#createVisibility(childPOJO),
        })
      }
      if (childPOJO.type === 'group') {
        return new Group(this.#createChildren(childPOJO.children), {
          visibility: GroupFactory.#createVisibility(childPOJO),
        })
      }

      throw new Error("'type' has to be either 'prop' or 'group'")
    })
  }

  /**
   * Creates a visibility when the pojo has respective properties. Returns a default
   * validator with no constraints otherwise
   * @private
   */
  static #createVisibility(pojo: GroupPOJO | PropPOJO): Visibility {
    return new Visibility({
      hiddenOn: 'hiddenOn' in pojo ? pojo.hiddenOn : false,
      visibleOn: 'visibleOn' in pojo ? pojo.visibleOn : true,
    })
  }
}

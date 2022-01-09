import * as jsonLogic from 'json-logic-js'
import { RulesLogic } from 'json-logic-js'
import { ConditionalContext } from '../types'

interface Options {
  hiddenOn?: RulesLogic
  visibleOn?: RulesLogic
}

export default class Visibility {
  hiddenOn: RulesLogic
  visibleOn: RulesLogic

  /**
   * @param hiddenOn - Logic, which defines whether this instance is hidden
   *   (takes precedence over visibleOn)
   * @param visibleOn - Logic, which defines whether this instance is visible
   */
  constructor({ hiddenOn = false, visibleOn = true }: Options = {}) {
    this.hiddenOn = hiddenOn
    this.visibleOn = visibleOn
  }

  /**
   * Test whether this instance is visible or hidden based on a context
   * @param context - Context that is used to calculate the condition
   */
  isVisible(context: ConditionalContext = { values: {} }): boolean {
    return jsonLogic.apply(this.hiddenOn, context)
      ? false
      : jsonLogic.apply(this.visibleOn, context);
  }
}

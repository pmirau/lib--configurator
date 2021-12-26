import jsonLogic from 'json-logic-js';

export default class Edge {
  #_id;
  #_isDisabledOn;
  #_isEnabledOn;
  to;
  priority;

  /**
   * @param {string} id
   * @param {Node} to - ID of Node
   * @param {number} priority - Determines which edge should be selected,
   *   when there are multiple possible ones
   * @param {module:configurator/graph/JsonLogic} isDisabledOn - Logic, which defines
   *   whether this edge is disabled or not (takes precedence over isEnabledOn)
   * @param {module:configurator/graph/JsonLogic} isEnabledOn - Logic, which defines
   *   whether this edge is enabled or not
   */
  constructor(
    id,
    to,
    {
      priority = 10,
      isDisabledOn = false,
      isEnabledOn = true,
    } = {},
  ) {
    this.#_id = id;
    this.to = to;
    this.priority = priority;
    this.#_isDisabledOn = isDisabledOn;
    this.#_isEnabledOn = isEnabledOn;
  }

  get id() {
    return this.#_id;
  }

  /**
   * Test whether this Edge is enabled or not based on a context
   * @param {module:configurator/graph/ConditionalContext} context - Context that is used to
   *   calculate the condition
   * @return {boolean}
   */
  testIfEnabled(context) {
    return jsonLogic.apply(this.#_isDisabledOn, context)
      ? false
      : jsonLogic.apply(this.#_isEnabledOn, context);
  }
}

import { ConditionalContext } from '../types';
import * as jsonLogic from 'json-logic-js';
import { RulesLogic } from 'json-logic-js';
import Node from './Node';

interface EdgeOptions {
  priority?: number;
  isDisabledOn?: RulesLogic;
  isEnabledOn?: RulesLogic;
}

export default class Edge {
  readonly #_id: string;
  readonly #_isDisabledOn: RulesLogic;
  readonly #_isEnabledOn: RulesLogic;
  to: Node;
  priority: number;

  /**
   * @param id
   * @param to - ID of Node
   * @param priority - Determines which edge should be selected, when there are
   *   multiple possible ones
   * @param isDisabledOn - Logic, which defines whether this edge is disabled or not
   *   (takes precedence over isEnabledOn)
   * @param isEnabledOn - Logic, which defines whether this edge is enabled or not
   */
  constructor(
    id: string,
    to: Node,
    {
      priority = 10,
      isDisabledOn = false,
      isEnabledOn = true,
    }: EdgeOptions = {},
  ) {
    this.#_id = id;
    this.to = to;
    this.priority = priority;
    this.#_isDisabledOn = isDisabledOn;
    this.#_isEnabledOn = isEnabledOn;
  }

  get id(): string {
    return this.#_id;
  }

  /**
   * Test whether this Edge is enabled or not based on a context
   * @param context - Context that is used to calculate the condition
   */
  testIfEnabled(context: ConditionalContext = { values: {} }): boolean {
    return jsonLogic.apply(this.#_isDisabledOn, context)
      ? false
      : jsonLogic.apply(this.#_isEnabledOn, context);
  }
}

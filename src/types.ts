/**
 * Interface, used for calculating conditionals
 * @property values - "Form values" of the properties. (key=id_of_property)
 */
import { RulesLogic } from 'json-logic-js';

export interface ConditionalContext {
  values: {
    [idOfProperty: string]: any;
  }
}

/**
 * Edge in POJO
 * @property id
 * @property to - ID of destination node
 * @property [priority]
 * @property [isEnabledOn] - JsonLogic for enabledOn
 * @property [isDisabledOn] - JsonLogic for disabledOn
 */
export interface EdgePOJO {
  id: string;
  to: string;
  priority?: number;
  isEnabledOn?: RulesLogic;
  isDisabledOn?: RulesLogic;
}

/**
 * Node in POJO
 * @property id
 * @property [edges]
 */
export interface NodePOJO {
  id: string;
  edges?: EdgePOJO[]
}

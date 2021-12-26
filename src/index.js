export { default as Edge } from './graph/Edge';
export { default as Node } from './graph/Node';
export { default as Graph } from './graph/Graph';
export { default as GraphFactory } from './factories/GraphFactory';

/**
 * Interface, used for calculating conditionals
 * @typedef {{}} module:configurator/graph/ConditionalContext
 * @property {object} values - "Form values" of the properties. (key=id_of_property)
 */

/**
 * Edge in POJO
 * @typedef module:configurator/graph/EdgePOJO
 * @type {object}
 * @property {string} id
 * @property {string} to - ID of destination node
 * @property {number} [priority]
 * @property {object} [enabledOn] - JsonLogic for enabledOn
 * @property {object} [disabledOn] - JsonLogic for disabledOn
 */

/**
 * Node in POJO
 * @typedef module:configurator/graph/NodePOJO
 * @type {object}
 * @property {string} id
 * @property {module:configurator/graph/EdgePOJO[]} [edges]
 */

/**
 * A JsonLogic parseable object (POJO or JSON) {@link https://jsonlogic.com/}
 * @typedef {{}} module:configurator/graph/JsonLogic
 */

export default class Node {
  #_id;
  edges = new Map();

  /**
   * @param {string} id
   */
  constructor(id) {
    this.#_id = id;
  }

  /**
   * @param {Edge} edge
   */
  addEdge(edge) {
    if (edge.to.id === this.#_id) {
      throw new Error('No self-referencing nodes allowed');
    }

    this.edges.set(edge.id, edge);
  }

  get id() {
    return this.#_id;
  }

  // TODO Is executed on every query -> Performance issue? Maybe set next from elsewhere on specific
  //  events instead on every query? (or sorted list by priority)
  /**
   * @param {module:configurator/graph/ConditionalContext} context - Context that will be injected
   *   into the test method
   * @returns {Node} - Enabled node with the lowest priority
   */
  next(context) {
    return Node.#getPrioritizedEdge(Node.#getEnabledEdges(this.edges, context))?.to; // TODO: Remove '?'
  }

  /**
   * @param {Map<Edge>} edges - Edges to search through
   * @param {module:configurator/graph/ConditionalContext} context - Context that will be injected
   *   into the test method
   * @return {Map<Edge>} - Enabled edges
   */
  static #getEnabledEdges(edges, context) {
    const enabledEdges = new Map();

    edges.forEach((value, key) => {
      if (value.testIfEnabled(context)) {
        enabledEdges.set(key, value);
      }
    });

    return enabledEdges;
  }

  /**
   * Get the edge with the lowest priority
   * @param {Map<Edge>} edges - Edges to search through
   * @return {Edge}
   */
  static #getPrioritizedEdge(edges) {
    let [prioritizedEdge] = edges.values();

    edges.forEach((value) => {
      if (value.priority < prioritizedEdge.priority) {
        prioritizedEdge = value;
      }
    });

    return prioritizedEdge;
  }
}

/**
 * Tree-like graph
 */
export default class Graph {
  #_id;
  start;

  constructor(id) {
    this.#_id = id;
  }

  get id() {
    return this.#_id;
  }

  /**
   * Set starting node
   * @param {Node} node - Starting node
   */
  setStart(node) {
    this.start = node;
  }

  /**
   * Return the valid path
   * @param {module:configurator/graph/ConditionalContext} context - Context for 'next'-nodes
   * @return {Node[]} - Path of nodes
   */
  getActivePath(context) {
    const path = [this.start];
    let next = this.start.next(context);

    while (next) {
      path.push(next);
      next = next.next(context);
    }

    return path;
  }

  /**
   * Prints a string of the active path. For debug purposes.
   * @param {module:configurator/graph/ConditionalContext} context - Context for 'next'-nodes
   * @return {string}
   */
  print(context) {
    const activePath = this.getActivePath(context);
    let pathString = '';

    activePath.forEach((node, index) => {
      if (index !== 0) pathString += '\n';
      pathString += `${node.id}`;
    });

    return pathString;
  }
}

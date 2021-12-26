import Node from './Node';
import { ConditionalContext } from '../types';

/**
 * Tree-like graph
 */
export default class Graph {
  readonly #_id: string;
  start?: Node;

  constructor(id: string) {
    this.#_id = id;
  }

  get id(): string {
    return this.#_id;
  }

  /**
   * Set starting node
   * @param node - Starting node
   */
  setStart(node: Node) {
    this.start = node;
  }

  /**
   * Return the valid path
   * @param context - Context for 'next'-nodes
   * @return - Path of nodes
   */
  getActivePath(context: ConditionalContext): Node[] {
    if (this.start == undefined) {
      throw new Error('Graph has no start node');
    }

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
   * @param context - Context for 'next'-nodes
   */
  print(context: ConditionalContext): string {
    const activePath = this.getActivePath(context);
    let pathString = '';

    activePath.forEach((node, index) => {
      if (index !== 0) pathString += '\n';
      pathString += `${node.id}`;
    });

    return pathString;
  }
}

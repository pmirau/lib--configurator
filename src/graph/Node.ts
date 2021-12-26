import Edge from './Edge';
import { ConditionalContext } from '../types';

export default class Node {
  readonly #_id: string;
  edges: Map<string, Edge> = new Map();

  /**
   * @param id - ID of Node
   */
  constructor(id: string) {
    this.#_id = id;
  }

  addEdge(edge: Edge) {
    if (edge.to.id === this.#_id) {
      throw new Error('No self-referencing nodes allowed');
    }

    this.edges.set(edge.id, edge);
  }

  get id(): string {
    return this.#_id;
  }

  // TODO Is executed on every query -> Performance issue? Maybe set next from elsewhere on specific
  //  events instead on every query? (or sorted list by priority)
  /**
   * @param context - Context that will be injected into the test method
   * @returns Enabled node with the lowest priority
   */
  next(context?: ConditionalContext): Node {
    return Node.#getPrioritizedEdge(Node.#getEnabledEdges(this.edges, context))?.to; // TODO: Remove '?'
  }

  /**
   * @param edges - Edges to search through
   * @param context - Context that will be injected into the test method
   * @return Enabled edges
   */
  static #getEnabledEdges(
    edges: Map<string, Edge>,
    context?: ConditionalContext
  ): Map<string, Edge> {
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
   * @param edges - Edges to search through
   * @return
   */
  static #getPrioritizedEdge(edges: Map<string, Edge>): Edge {
    let [prioritizedEdge] = edges.values();

    edges.forEach((value) => {
      if (value.priority < prioritizedEdge.priority) {
        prioritizedEdge = value;
      }
    });

    return prioritizedEdge;
  }
}

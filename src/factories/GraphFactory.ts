import Edge from '../graph/Edge';
import Node from '../graph/Node';
import Graph from '../graph/Graph';
import { NodePOJO } from '../types';

export default class GraphFactory {
  dataSource: NodePOJO[] = [];

  /**
   * @param dataSource - from which the graph will be build
   */
  constructor(dataSource: NodePOJO[]) {
    this.dataSource = dataSource;
  }

  createGraph(graphID: string) {
    // allNodes
    const nodes = this.#createSimpleNodes();

    // allEdges
    const edges = this.#createEdges(nodes);

    // allNodes->addEdges
    this.dataSource.forEach((node) => {
      if (!node.edges) return;

      node.edges.forEach((edge) => {
        const nodeInstance = nodes.get(node.id);
        const edgeInstance = edges.get(edge.id);

        // These errors should never happen. Otherwise, implementation in this class is wrong
        if (!nodeInstance) {
          throw new Error(`Could not find Node with ID ${node.id} in the Map`);
        }

        if (!edgeInstance) {
          throw new Error(`Could not find Node with ID ${edge.id} in the Map`);
        }

        nodeInstance.addEdge(edgeInstance);
      });
    });

    // graph->setStart
    const graph = new Graph(graphID);
    const firstNode = nodes.get(this.dataSource[0].id);
    firstNode && graph.setStart(firstNode);

    return graph;
  }

  /**
   * Create all nodes without edges from the datasource.
   */
  #createSimpleNodes(): Map<string, Node> {
    const nodes = new Map();

    this.dataSource.forEach((node) => {
      nodes.set(node.id, new Node(node.id));
    });

    return nodes;
  }

  /**
   * Create all edges from the datasource
   * @param nodes - All nodes in the graph
   */
  #createEdges(nodes: Map<string, Node>): Map<string, Edge> {
    const edges = new Map();

    this.dataSource.forEach((node) => {
      if (!node.edges) return;

      node.edges.forEach((edge) => {
        const toNode = nodes.get(edge.to);

        if (!toNode) {
          throw new Error(`Invalid data source: Edge '${edge.id}' points to a non-existing node`);
        }

        edges.set(edge.id, new Edge(edge.id, toNode, {
          ...(edge.priority === undefined || { priority: edge.priority }) as {},
          ...(edge.isEnabledOn === undefined || { isEnabledOn: edge.isEnabledOn }) as {},
          ...(edge.isDisabledOn === undefined || { isDisabledOn: edge.isDisabledOn }) as {},
        }));
      });
    });

    return edges;
  }
}

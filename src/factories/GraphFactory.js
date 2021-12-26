import Edge from '../graph/Edge';
import Node from '../graph/Node';
import Graph from '../graph/Graph';

export default class GraphFactory {
  /** @member {module:configurator/graph/NodePOJO[]} */
  dataSource = [];

  /**
   * @param {module:configurator/graph/NodePOJO[]} dataSource - from which the graph will be build
   */
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  createGraph() {
    // allNodes
    const nodes = this.#createSimpleNodes();

    // allEdges
    const edges = this.#createEdges(nodes);

    // allNodes->addEdges
    this.dataSource.forEach((node) => {
      if (!node.edges) return;

      node.edges.forEach((edge) => {
        nodes.get(node.id).addEdge(edges.get(edge.id));
      });
    });

    // graph->setStart
    const graph = new Graph();
    graph.setStart(nodes.get(this.dataSource[0].id));

    return graph;
  }

  /**
   * Create all nodes without edges from the datasource.
   * @return {Map<string, Node>}
   */
  #createSimpleNodes() {
    const nodes = new Map();

    this.dataSource.forEach((node) => {
      nodes.set(node.id, new Node(node.id));
    });

    return nodes;
  }

  /**
   * Create all edges from the datasource
   * @param {Map<string, Node>} nodes - All nodes in the graph
   * @return {Map<string, Edge>}
   */
  #createEdges(nodes) {
    const edges = new Map();

    this.dataSource.forEach((node) => {
      if (!node.edges) return;

      node.edges.forEach((edge) => {
        const toNode = nodes.get(edge.to);

        if (!toNode) {
          throw new Error(`Invalid data source: Edge '${edge.id}' points to a non-existing node`);
        }

        edges.set(edge.id, new Edge(edge.id, toNode, {
          ...(edge.priority === undefined || { priority: edge.priority }),
          ...(edge.isEnabledOn === undefined || { isEnabledOn: edge.isEnabledOn }),
          ...(edge.isDisabledOn === undefined || { isDisabledOn: edge.isDisabledOn }),
        }));
      });
    });

    return edges;
  }
}

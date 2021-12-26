import Graph from '../../src/graph/Graph';
import Node from '../../src/graph/Node';
import Edge from '../../src/graph/Edge';

describe('Graph', () => {
  let graph1: Graph;
  let node1: Node;
  let node2: Node;
  let node3: Node;
  let node4: Node;

  const contextShortPath = {
    values: {
      p2: 'nein',
    },
  };
  const contextLongPath = {
    values: {
      ...contextShortPath.values,
      p2: 'ja',
    },
  };

  beforeEach(() => {
    graph1 = new Graph('g1');
    node1 = new Node('n1');
    node2 = new Node('n2');
    node3 = new Node('n3');
    node4 = new Node('n4');

    node1.addEdge(new Edge('e1', node2));
    node2.addEdge(new Edge('e2', node3, {
      priority: 1,
      isEnabledOn: { '===': [{ var: 'values.p2' }, 'ja'] },
    }));
    node2.addEdge(new Edge('e3', node4));
    node3.addEdge(new Edge('e4', node4));
  });

  it('initializes correctly', () => {
    expect(graph1).toEqual({});
    expect(graph1.id).toBe('g1');
  });

  it('sets starting node', () => {
    graph1.setStart(node1);

    expect(graph1).toEqual({
      start: node1,
    });
  });

  it('throws when trying to access active path without a start node', () => {
    expect(() => {
      graph1.getActivePath(contextShortPath);
    }).toThrowError('Graph has no start node');
  });

  // TODO Or store context in graph and have graph.updateContext(context) ?
  it('returns active path', () => {
    graph1.setStart(node1);

    expect(graph1.getActivePath(contextShortPath)).toEqual([node1, node2, node4]);
    expect(graph1.getActivePath(contextLongPath)).toEqual([node1, node2, node3, node4]);
  });

  it('prints path', () => {
    graph1.setStart(node1);
    expect(graph1.print(contextShortPath)).toBe(
      'n1\n'
      + 'n2\n'
      + 'n4',
    );
  });
});

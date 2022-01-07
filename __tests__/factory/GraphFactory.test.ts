import GraphFactory from '../../src/factories/GraphFactory';
import nodesData from '../../src/__example__/data/graph/nodes.json';
import path1Context from '../../src/__example__/data/graph/context/path1.json';
import path2Context from '../../src/__example__/data/graph/context/path2.json';
import path3Context from '../../src/__example__/data/graph/context/path3.json';
import { path1, path2, path3 } from '../../src/__example__/data/graph/context/debug';

describe('GraphFactory', () => {
  it('creates a graph from a plain data source', () => {
    // @ts-ignore - Doesn't recognize tuple type
    const graphFactory = new GraphFactory(nodesData);
    const graph = graphFactory.createGraph('g1');

    expect(graph.print(path1Context)).toEqual(path1);
    expect(graph.print(path2Context)).toEqual(path2);
    expect(graph.print(path3Context)).toEqual(path3);
  });

  describe('data-source', () => {
    it('throws when an edge points to a non-existing node', () => {
      const invalidNodesData = [{
        id: 'n1',
        name: 'Schritt 1',
        edges: [{ id: 'e1', to: 'n2' }],
      }];
      const graphFactory = new GraphFactory(invalidNodesData);

      expect(() => {
        graphFactory.createGraph('g1');
      }).toThrowError('Invalid data source: Edge \'e1\' points to a non-existing node');
    });
  });
});

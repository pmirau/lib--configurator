import Node from '../../graph/Node';
import Edge from '../../graph/Edge';

describe('Node', () => {
  let node1;
  let node2;
  let node3;
  let node4;

  beforeEach(() => {
    node1 = new Node('n1');
    node2 = new Node('n2');
    node3 = new Node('n3');
    node4 = new Node('n4');
  });

  it('initializes correctly', () => {
    expect(node1).toEqual({
      edges: new Map(),
    });
    expect(node1.id).toBe('n1');
  });

  it('protects read-only fields', () => {
    expect(() => {
      node1.id = 'nX';
    }).toThrow();
    expect(node1.id).toBe('n1');
  });

  describe('addEdge()', () => {
    it('adds edges', () => {
      const edge1 = new Edge('e1', node2);
      node1.addEdge(edge1);

      expect(node1).toEqual({
        edges: new Map([['e1', edge1]]),
      });
      expect(node1.next()).toBe(node2);
    });

    it('denies self-referencing nodes', () => {
      expect(() => node2.addEdge(new Edge('e1', node2)))
        .toThrowError('No self-referencing nodes allowed');
    });

    xit('denies cycles', () => {
      // TODO Throw when cycles exist
    });
  });

  describe('next()', () => {
    it('selects correct next-node based on priority', () => {
      node1.addEdge(new Edge('e1', node2));
      node1.addEdge(new Edge('e2', node3, { priority: 0.8 }));
      node1.addEdge(new Edge('e3', node4, { priority: 2 }));

      expect(node1.next()).toBe(node3);
    });

    it('selects correct next-node based on context', () => {
      const trueContext = {
        values: {
          atlas: 'air',
          paradise: 'circus',
        },
      };
      const falseContext = {
        values: {
          ...trueContext.values,
          paradise: 'minute',
        },
      };

      const isEnabledOn = {
        and: [
          { '===': [{ var: 'values.atlas' }, 'air'] },
          { '===': [{ var: 'values.paradise' }, 'circus'] },
        ],
      };

      node1.addEdge(new Edge('e3', node4, { priority: 12 }));
      node1.addEdge(new Edge('e2', node3, { priority: 0.8, isEnabledOn }));
      node1.addEdge(new Edge('e1', node2));

      expect(node1.next(trueContext).id).toBe('n3');
      expect(node1.next(falseContext).id).toBe('n2');
    });
  });
});

import Node from '../../src/graph/Node';
import Edge from '../../src/graph/Edge';
import { RulesLogic } from 'json-logic-js';

describe('Edge', () => {
  let node1: Node;
  let edge1: Edge;

  beforeEach(() => {
    node1 = new Node('n1');
    edge1 = new Edge('e1', node1);
  });

  it('initializes correctly', () => {
    expect(edge1).toEqual({
      to: node1,
      priority: 10,
    });
    expect(edge1.id).toBe('e1');
  });

  describe('testIfEnabled()', () => {
    const contextTrue = {
      values: {
        mantra: 'I am a God',
        luckyNumber: 777,
        high: false,
        thoughts: {
          exit: 'Get High',
        },
      },
    };
    const contextFalse = {
      values: {
        ...contextTrue.values,
        mantra: 'Will the real Slim Shady please stand up',
      },
    };

    const isDisabledOn: RulesLogic = {
      '===': [
        { var: 'values.luckyNumber' },
        777,
      ],
    };

    const isEnabledOn: RulesLogic = {
      or: [
        {
          and: [
            {
              '===': [
                { var: 'values.mantra' },
                'I am a God',
              ],
            },
            {
              or: [
                {
                  '===': [
                    { var: 'values.luckyNumber' },
                    777,
                  ],
                },
                {
                  '!': { var: 'values.high' },
                },
              ],
            },
          ],
        },
        {
          '===': [
            { var: 'values.thoughts.exit' },
            'Stay down',
          ],
        },
      ],
    };

    it('calculates conditionals based on the predefined interface "context"', () => {
      const edge = new Edge('e', node1, { isEnabledOn });

      const isEnabledTrue = edge.testIfEnabled(contextTrue);
      const isEnabledFalse = edge.testIfEnabled(contextFalse);

      expect(isEnabledTrue).toBe(true);
      expect(isEnabledFalse).toBe(false);
    });

    it('prioritizes isDisabledOn over isEnabledOn', () => {
      const edge = new Edge('e', node1, { isDisabledOn, isEnabledOn });
      const isEnabled = edge.testIfEnabled(contextTrue);

      expect(isEnabled).toBe(false);
    });
  });
});

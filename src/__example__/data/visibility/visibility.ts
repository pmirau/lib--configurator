import { RulesLogic } from 'json-logic-js'
import { ConditionalContext } from '../../../types'

export const contextTrue: ConditionalContext = {
  values: {
    mantra: 'I am a God',
    luckyNumber: 777,
    high: false,
    thoughts: {
      exit: 'Get High',
    },
  },
};
export const contextFalse: ConditionalContext = {
  values: {
    ...contextTrue.values,
    mantra: 'Will the real Slim Shady please stand up',
    luckyNumber: 776,
  },
};

export const hiddenOn: RulesLogic = {
  '===': [
    { var: 'values.luckyNumber' },
    777,
  ],
};

export const visibleOn: RulesLogic = {
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

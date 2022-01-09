import Visibility from '../../src/visibility/Visibility'
import {
  contextFalse,
  contextTrue,
  hiddenOn,
  visibleOn,
} from '../../src/__example__/data/visibility/visibility'

describe('Visibility', () => {
  it('initializes correctly', () => {
    const visibility = new Visibility({ hiddenOn, visibleOn })

    expect(visibility).toEqual({ hiddenOn, visibleOn })
  })

  describe('isVisible', () => {
    it('calculates visibility based on the predefined interface "context"', () => {
      const visibility = new Visibility({ visibleOn })

      const isVisibleTrue = visibility.isVisible(contextTrue)
      const isVisibleFalse = visibility.isVisible(contextFalse)

      expect(isVisibleTrue).toBe(true)
      expect(isVisibleFalse).toBe(false)
    })

    it('prioritizes hiddenOn over visibleOn', () => {
      const visibility = new Visibility({ hiddenOn, visibleOn })
      const isVisible = visibility.isVisible(contextTrue)

      expect(isVisible).toBe(false)
    })
  })
})

import {addDateMock, runStorybookContainerTests} from '@wepublish/testing'
import * as stories from './subscription-list-container.stories'

describe('SubscriptionList Container', () => {
  addDateMock()

  beforeAll(() => {
    Object.defineProperty(global.window, 'location', {
      value: {
        href: 'http://localhost'
      }
    })
  })

  runStorybookContainerTests(stories)
})

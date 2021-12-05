import { shallowMount } from '@vue/test-utils'
import Polygraph from '@/components/Polygraph.vue'

describe('Polygraph.vue', () => {
    it('renders error message', () => {
      const errorMessage = 'this is an error message'
      const wrapper = shallowMount(Polygraph, {
        data() {
            return { error: errorMessage }
        }
      })
      expect(wrapper.find('.error-message').exists()).toBe(true)
      expect(wrapper.find('.error-message').text()).toContain(errorMessage)
    })
  })
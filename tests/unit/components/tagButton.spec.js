import { shallowMount } from '@vue/test-utils'
import TagButton from '@/components/TagButton.vue'

describe('TagButton.vue', () => {
    it('renders button', () => {
      
        const propsData = {
            word: 'keyword',
            weight: '1',
        }
      
      const wrapper = shallowMount(TagButton, {
        propsData
      })
      expect(wrapper.find('.tagButton').exists()).toBe(true)
      expect(wrapper.find('.tagButton').text()).toContain(propsData.word)
    })
  })
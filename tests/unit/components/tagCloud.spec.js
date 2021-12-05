// import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import TagCloud from '@/components/TagCloud.vue'

describe('TagCloud.vue', () => {
    it('renders tag cloud', () => {
      const propsData = { 
        trending : [{
          word: 'keyword',
          weight: 1
          }]
      }
      const wrapper = shallowMount(TagCloud, {
        propsData
      })
      expect(wrapper.find('.cloud').exists()).toBe(true)
    })
  })
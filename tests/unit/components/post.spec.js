import { shallowMount } from '@vue/test-utils'
import Post from '@/components/Post.vue'

describe('Post.vue', () => {
    it('renders bpost', () => {
      
        const propsData = {
            claim: {
                "text": "Vice President Leni Robredo poses as a seafood vendor to court votes",
                "claimant": "Multiple sources",
                "claimDate": "2021-11-30T00:00:00Z",
                "claimReview": [
                  {
                    "publisher": {
                      "name": "AFP Fact Check",
                      "site": "factcheck.afp.com"
                    },
                    "url": "https://factcheck.afp.com/http%253A%252F%252Fdoc.afp.com%252F9TV86L-1",
                    "title": "Photo of Philippine seafood market doctored to insert image of VP Leni Robredo",
                    "reviewDate": "2021-12-05T09:40:00Z",
                    "textualRating": "Altered Image",
                    "languageCode": "en"
                  }
                ]
              },
            textualRating: 'true'
        }
      
      const wrapper = shallowMount(Post, {
        propsData
      })
      expect(wrapper.find('.article-inner').exists()).toBe(true)
      expect(wrapper.find('.claim-text').exists()).toBe(true)
      expect(wrapper.find('.claim-text').text()).toContain(propsData.claim.text)
    })
  })
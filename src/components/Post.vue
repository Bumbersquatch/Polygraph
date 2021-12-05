<template>
    <a :href="claim.claimReview[0].url" class="article-inner bg-white text-blue p-12 relative border-r-4 block" target="_blank" rel="noopener noreferrer">
      <div class="article-status top-0 left-0 absolute w-full bg-red text-white p-2">
        <template v-if="textualRating == 'false'">
          <font-awesome-icon  icon="exclamation-circle"></font-awesome-icon>
        </template>
        <template v-else-if="textualRating == 'true'">
          <font-awesome-icon  icon="check-circle"></font-awesome-icon>
        </template>
        <template v-else>
          <font-awesome-icon  icon="exclamation-triangle"></font-awesome-icon>
        </template>
      </div>
      <p v-if="claim.claimant" class="text-sm mt-3">Claim by: {{claim.claimant}}</p>
      <p class="claim-text text-xl py-3 font-bold">{{claim.text}}</p>
      <p class="text-sm">Review by <a :href="claim.claimReview[0].publisher.site" target="_blank" rel="noopener noreferrer"> {{claim.claimReview[0].publisher.name}}</a> :
      <p><span class="font-bold">{{claim.claimReview[0].textualRating}}</span></p>
      <font-awesome-icon class="absolute bottom-3 right-3" icon="external-link-alt"></font-awesome-icon>
    </a>
</template>

<script>
export default {
    name: 'Post',
    props: {
        claim: Object,
        textualRating: String
    }
}
</script>
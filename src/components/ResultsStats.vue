<template>
    <div id="stats" class="py-6 flex flex-wrap justify-center items-center">
        <div class="w-full lg:w-1/3 pl-6 lg:pl-0 pr-6 py-3 lg:border-r flex items-center justify-center">
          <div class="text-center lg:text-left">
            <p class="text-sm">Search Query:</p>
            <p class="text-4xl uppercase font-bold">{{claimsStats.search}}</p>
          </div>
        </div>
        <div class="w-full lg:w-1/3 px-6 py-3 lg:border-r flex items-center justify-center">
          <div class="text-center lg:text-left">
            <p class="text-sm">Claims from the last:</p>
            <p class="text-4xl uppercase font-bold">{{claimsStats.days}} days</p>
          </div>
        </div>
        <div class="w-full lg:w-1/3 pl-6 py-3 flex items-center justify-center">
          <div class="text-center lg:text-left">
            <p class="text-sm">Mis-information:</p>
            <p class="text-4xl font-bold text-red">{{claimsStats.misinformationPercentage}}%</p>
          </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ResultsStats',
    props: { 
        claimsStats: Object
    },
}
</script>
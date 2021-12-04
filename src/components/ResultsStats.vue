<template>
    <div id="stats" class="py-6 flex justify-center items-center">
        <div class="w-1/3 pr-6 py-3 border-r flex items-center justify-center">
          <div>
            <p class="text-sm">Search Query:</p>
            <p class="text-4xl uppercase font-bold">{{claimsStats.search}}</p>
          </div>
        </div>
        <div class="w-1/3 px-6 border-r flex items-center justify-center">
          <div>
            <p class="text-sm">Claims from the last:</p>
            <p class="text-4xl uppercase font-bold">{{claimsStats.days}} days</p>
          </div>
        </div>
        <div class="w-1/3 pl-6 flex items-center justify-center">
          <div>
            <p class="text-sm">Mis-information:</p>
            <p class="text-4xl font-bold text-red">{{claimsStats.misninformationPercentage}}%</p>
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
<template>
    <div id="loading" class="absolute bottom-20 left-0 right-0 m-auto w-full text-center text-3xl">
        <p v-if="!claims" class="text-lg pb-3">Please Select a trending topic to continue</p>
        <template v-if="loading">
            <font-awesome-icon   icon="cog" class="fa-spin"></font-awesome-icon>
        </template>
        <template v-else>
            <font-awesome-icon v-if="!claims" icon="arrow-down"></font-awesome-icon>
        </template>
    </div>
</template>

<script>
export default {
    name: 'BannerLoading',
    props: {
        loading: Boolean,
        claims: Array
    },
}
</script>

<style>
    #loading{
        animation-fill-mode: forwards;
        animation-name: fade;
        animation-duration: 2s;
    }
</style>
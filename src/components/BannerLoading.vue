<template>
    <div id="loading" class="relative md:absolute md:bottom-0 md:left-0 md:right-0 m-auto w-full text-center text-lg md:text-3xl mt-12 md:my-6 order-1">
        <p v-if="!claims" class="md:text-lg pb-3">Please Select a trending topic to continue</p>
        <template v-if="loading">
            <font-awesome-icon   icon="cog" class="fa-spin"></font-awesome-icon>
        </template>
        <template v-else>
            <font-awesome-icon v-if="!claims" icon="chevron-down"></font-awesome-icon>
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
<template>
<nav class="navbar navbar-dark bg-dark">
    <div class="container">
        <router-link class="navbar-brand" :to="{name: 'Dashboard'}">
            <i class="fa fa-braille"></i>
            <span style="margin-left: 12px;">Project Management App</span>
        </router-link>
    </div>
</nav>
</template>

<script>
export default {
    name: "Navbar"
}
</script>

<style lang="scss">
</style>

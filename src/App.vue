<template>
<div class="page-container">
    <navbar></navbar>
    <router-view></router-view>
    <div class="footer">
        <div class="container">
            <span>&copy; 2018 (open-source)</span>
            <span class="float-right">View this project on Github</span>
        </div>
    </div>
</div>
</template>

<script>
import Navbar from "@/components/common/nav/navbar"

export default {
    name: "App",
    components: {
        "navbar": Navbar
    },
    data: function () {
        return {
            initializingApp: true
        }
    },
    mounted: function () {
        this.$store.dispatch("initialize").then(() => {
            this.initializingApp = false
        })
    }
}
</script>

<style lang="scss">
// Page layout (so that footer always stays in the bottom)
html, body {
    height: 100%;
    min-width: 320px;
}

.page-container {
    min-height: 100%;
    position: relative;
    padding-bottom: 40px;  // Height of footer + some extra spacing

    & > .container {
        // This is the bootstrap container element, which needs to be separated from header and footer
        margin: 20px auto;
    }

    .footer {
        // Footer is positioned in the bottom of page-container, which is atleast as tall as the entire page
        // This ensures that it always stays at the bottom even when we do not have sufficient content in page
        position: absolute;
        bottom: 0;
        width: 100%;
        font-size: 0.75rem;
        line-height: 30px;
        color: #424242;  /* Grey 800 */
        background-color: #DDD;
    }
}
</style>

import Vue from "vue"
import BootstrapVue from "bootstrap-vue"
import App from "./App"
import Router from "./router"

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router: Router,
    render: h => h(App)
})

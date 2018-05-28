import Vue from "vue"
import BootstrapVue from "bootstrap-vue"
import App from "./App"
import Router from "./router"
import Store from "./store"

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "font-awesome/css/font-awesome.css"

Vue.use(BootstrapVue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router: Router,
    store: Store,
    render: h => h(App)
})

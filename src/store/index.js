// Vue framework modules
import Vue from "vue"
import Vuex from "vuex"

// Mutations and Actions
import actions from "./actions"
import mutations from "./mutations"

// Initialize state management and resource modules
Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: mutations,
    actions: actions,
    // Strict mode is only enabled in development box. It is not recommended in
    // production env for performance reasons.
    // Ref: https://vuex.vuejs.org/en/strict.html
    strict: process.env.NODE_ENV !== "production"
})

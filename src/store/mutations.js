import Vue from "vue"

// List of mutations in the store
export default {
    setItem: function (state, obj) {
        Vue.set(state, obj.key, obj.value)
    },
    deleteItem: function (state, obj) {
        Vue.delete(state, obj.key)
    }
}

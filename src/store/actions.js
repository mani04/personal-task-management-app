// List of actions in the store
export default {
    // Initialize method reads existing Projects and Tasks in localStorage and stores in state
    initialize: function (context, params) {
        return new Promise((resolve, reject) => {
            for (var key in window.localStorage) {
                let storeItem
                try {
                    storeItem = JSON.parse(window.localStorage.getItem(key))
                } catch (e) {
                    // The value for this key is not in JSON format, and probably belongs to some other app
                    continue
                }
                // Check if this item is not undefined and also has the "id" and "type" property
                if (storeItem && storeItem.id && storeItem.type) {
                    // Ensure that it is either a Project or a Task
                    // If neither a Project or Task, then this JSON project probably belongs to some other app in this domain
                    if (storeItem.type === "Project" || storeItem.type === "Task") {
                        // Add this to store
                        context.commit("setItem", {
                            key: storeItem.id,
                            value: storeItem
                        })
                    }
                }
            }
            resolve()
        })
    },
    // This method is used to store component data in cache
    update: function (context, params) {
        return new Promise((resolve, reject) => {
            // Update in localStorage
            window.localStorage.setItem(params.key, JSON.stringify(params.value))
            // Now update in this.$store
            context.commit("setItem", {
                key: params.key,
                value: params.value
            })
            resolve()
        })
    },
    delete: function (context, params) {
        return new Promise((resolve, reject) => {
            // Delete from localStorage
            window.localStorage.removeItem(params.key)
            // Now delete from this.$store
            context.commit("deleteItem", {
                key: params.key
            })
            resolve()
        })
    }
}

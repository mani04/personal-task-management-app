<template>
<div class="task" :class="{'completed': task.completed}">
    <i class="fa" :class="[task.completed ? 'fa-check-square-o' : 'fa-square-o']" @click="toggleCompletedStatus()"></i>
    {{task.title}}
</div>
</template>

<script>
export default {
    name: "TaskRow",
    props: ["taskID"],
    computed: {
        task: function () {
            return this.$store.state[this.taskID]
        }
    },
    methods: {
        toggleCompletedStatus: function () {
            // task is a store object and therefore its properties cannot be directly manipulated
            // For example: we cannot use a checkbox and v-model="task.completed", as it will be
            // a direct manipulation of objects in store
            // Therefore we have this separate method to handle the complete / incomplete status
            // Step 1: Create a copy of this task where this can be modified
            let clonedTask = JSON.parse(JSON.stringify(this.task))
            // Step 2: Toggle the completed status in this cloned object
            clonedTask.completed = !clonedTask.completed
            // Now store this new object in $store.state
            this.$store.dispatch("update", {
                key: clonedTask.id,
                value: clonedTask
            }).then(() => {
                console.log("Updated status for " + clonedTask.title)
            })
        }
    }
}
</script>

<style lang="scss">
</style>

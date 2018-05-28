<template>
<div class="task" :class="{'completed': task.completed}">
    <i class="fa" :class="[task.completed ? 'fa-check-square-o' : 'fa-square-o']" @click="toggleCompletedStatus()"></i>
    {{task.title}}
    <div class="task-options">
        <i class="fa fa-times-circle delete-button" @click="deleteTask"></i>
    </div>
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
        },
        deleteTask: function () {
            // Remove this task ID from the parent project object
            let project = this.$store.state[this.task.projectID]
            // As usual, clone the project to avoid directly manipulating store objects
            let clonedProject = JSON.parse(JSON.stringify(project))
            // Find the index of this task and remove element in that index using splice
            clonedProject.taskIDs.splice(clonedProject.taskIDs.indexOf(this.taskID), 1)
            // Record changes to project object
            this.$store.dispatch("update", {
                key: clonedProject.id,
                value: clonedProject
            })
            // Remove task
            this.$store.dispatch("delete", {
                key: this.taskID
            })
        }
    }
}
</script>

<style lang="scss">
</style>

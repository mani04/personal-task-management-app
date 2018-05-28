<template>
<div class="container project-view" v-if="project">
    <div class="page-title">
        {{project.name}}
        <div class="page-options">
            <router-link class="btn btn-outline-secondary btn-sm" :to="{ name: 'Dashboard' }">Back to All Projects</router-link>
        </div>
    </div>
    <div class="list-of-tasks">
        <div class="sub-heading">Tasks:</div>
        <task-row v-for="taskID in project.taskIDs" :key="taskID" :taskID="taskID"></task-row>
        <div class="task" v-if="project.taskIDs.length == 0">
            There are no tasks to show in this project. Create your first task now!
        </div>
        <div class="task">
            <div class="form-inline">
                <input type="text" class="form-control form-control-sm mr-2 mt-2"
                        v-model="newTaskTitle"
                        @keyup.enter="createNewTask"
                        @keyup.esc="newTaskTitle=''"
                        placeholder="New Task">
                <button type="button" class="btn btn-outline-secondary btn-sm mr-2 mt-2"
                        v-if="newTaskTitle.trim().length > 0"
                        @click="createNewTask">Create New Task</button>
            </div>
        </div>
    </div>
</div>
<p class="container" v-else>Please wait... Loading project</p>
</template>

<script>
import TaskRow from "./task-row"
import generateTaskID from "@/components/common/utils/generate-random-numbers-string"

export default {
    name: "Project",
    props: ["projectID"],
    components: {
        "task-row": TaskRow
    },
    data: function () {
        return {
            newTaskTitle: ""
        }
    },
    computed: {
        project: function () {
            // Fetch the project object from store and return
            return this.$store.state[this.projectID]
        }
    },
    methods: {
        createNewTask: function () {
            if (this.newTaskTitle.trim().length > 0) {
                let taskID
                // Generate a unique taskID - keep trying till we get a unique 10 digit number
                do {
                    // Task IDs start with "task_" followed by a 10 digit random number
                    taskID = "task_" + generateTaskID(10)
                } while (window.localStorage.getItem(taskID) !== null)
                // Create new task object
                let newTask = {
                    id: taskID,
                    type: "Task",
                    title: this.newTaskTitle,
                    projectID: this.projectID
                }
                // Store this new task in $store.state
                this.$store.dispatch("update", {
                    key: newTask.id,
                    value: newTask
                })
                // Update the parent project object, by deep-cloning the project and then adding this taskID
                // We cannot update the store object directly outside a mutation.
                // Therefore we have to clone, make changes and update in store
                let clonedProjectObj = JSON.parse(JSON.stringify(this.project))
                // Add the new task ID as part of this project tasks
                clonedProjectObj.taskIDs.push(newTask.id)
                // Update project in $store.state
                this.$store.dispatch("update", {
                    key: clonedProjectObj.id,
                    value: clonedProjectObj
                })
                // Clear the new task form
                this.newTaskTitle = ""
            } else {
                console.log("Error: Unable to create task, new task field is still empty")
            }
        }
    }
}
</script>

<style lang="scss">
.project-view {
    .page-title {
        position: relative;
        font-size: 1.4rem;
        font-weight: bold;
        margin: 10px 0;
        padding-bottom: 10px;
        border-bottom: 1px solid #DDD;

        .page-options {
            position: absolute;
            top: 0px;
            right: 0px;
        }
    }
    .list-of-tasks {
        .sub-heading {
            padding: 10px 0;
            font-weight: bold;
        }
        .task {
            position: relative;
            padding: 10px;
            border-top: 1px solid #DDD;
            .fa {
                display: inline-block;
                width: 20px;
            }
            &.completed {
                color: #B8B8B8;
            }
            .task-options {
                position: absolute;
                display: none;
                top: 0;
                right: 0;
                .delete-button {
                    cursor: pointer;
                    margin: 12px 10px;
                    line-height: 16px;
                    color: #822;
                }
            }
            &:hover {
                .task-options {
                    display: block;
                }
            }
        }
    }
}
@media (min-width: 576px) {
    .task {
        .form-inline .form-control {
            width: 50%;
        }
    }
}
</style>

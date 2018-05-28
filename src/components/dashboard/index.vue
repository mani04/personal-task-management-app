<template>
<div class="container projects-dashboard">
    <div class="page-title">Your Projects</div>
    <div class="project-summary"
            v-for="project in allProjects"
            :key="project.id">
        <div class="title">
            <router-link :to="{ name: 'Project', params: {projectID: project.id} }">{{project.name}}</router-link>
        </div>
        <div class="details">
            Number of Tasks: {{project.taskIDs.length}}
        </div>
    </div>
    <div class="project-summary" v-if="allProjects.length == 0">
        There are no projects to show. Create your first project now!
    </div>
    <div class="project-summary">
        <div class="form-inline">
            <input type="text" class="form-control form-control-sm mr-2 mt-2"
                    v-model="newProjectName"
                    @keyup.enter="createNewProject"
                    @keyup.esc="clearNewProjectForm"
                    placeholder="New Project">
            <button type="button" class="btn btn-outline-secondary btn-sm mr-2 mt-2"
                    v-if="newProjectName.trim().length > 0"
                    @click="createNewProject">Create New Project</button>
            <button type="button" class="btn btn-outline-warning btn-sm mt-2"
                    v-if="newProjectName.trim().length > 0"
                    @click="clearNewProjectForm">Clear</button>
        </div>
        <div class="alert alert-danger mt-4" v-if="projectIdNotUnique">
            Error: Unable to create project. A project with similar name already exists.
        </div>
    </div>
</div>
</template>

<script>
import getUniqueProjectID from "@/components/common/utils/generate-url-friendly-string"
export default {
    name: "Dashboard",
    data: function () {
        return {
            newProjectName: "",
            projectIdNotUnique: false
        }
    },
    computed: {
        allProjects: function () {
            // Initialize an empty array for list of projects
            let allProjects = []
            // Iterate through all the available projects in $store.state and push projects data into allProjects list
            for (var key in this.$store.state) {
                let obj = this.$store.state[key]
                if (obj.id && obj.type) {
                    if (obj.type === "Project") {
                        allProjects.push(obj)
                    }
                }
            }
            // Finally we have the list of projects in one list, ready for display
            return allProjects
        }
    },
    methods: {
        createNewProject: function () {
            if (this.newProjectName.trim().length > 0) {
                // Ensure that this project ID is unique
                let uniqueProjectID = getUniqueProjectID(this.newProjectName)
                // If there is already a similar project ID, it will then be available in this.$store.state
                if (this.$store.state[uniqueProjectID]) {
                    // There is already a project with exactly the same ID, and possibly with a similar name
                    // Display error
                    this.projectIdNotUnique = true
                } else {
                    // Create a newProject object with all the relevant values and an empty list of tasks
                    let newProject = {
                        id: uniqueProjectID,
                        type: "Project",
                        name: this.newProjectName,
                        taskIDs: []
                    }
                    // Store this new project in $store.state and also in localStorage
                    this.$store.dispatch("update", {
                        key: newProject.id,
                        value: newProject
                    })
                    // The frontend automatically gets updated through the computed property: "allProjects"
                    // Clear the new project form
                    this.newProjectName = ""
                }
            } else {
                console.log("Error: Project name not provided. Please try again.")
            }
        },
        // Method to clear the new project form (and also the error if being displayed)
        clearNewProjectForm: function () {
            this.newProjectName = ""
            this.projectIdNotUnique = false
        }
    }
}
</script>

<style lang="scss">
.page-title {
    font-size: 1.4rem;
    margin: 10px 0;
}
.project-summary {
    padding: 10px;
    border-top: 1px solid #DDD;
    .title {
        margin-bottom: 5px;
        a {
            color: #000;
            font-weight: bold;
        }
    }
    .details {
        color: #666;
        padding-left: 10px;
        font-size: 0.8rem;
    }
    .alert {
        font-size: 0.9rem;
    }
}
@media (min-width: 576px) {
    .project-summary {
        .form-inline .form-control {
            width: 50%;
        }
    }
}
</style>

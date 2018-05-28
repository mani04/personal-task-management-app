import Vue from "vue"
import Router from "vue-router"
import Dashboard from "@/components/dashboard"
import Project from "@/components/project"

Vue.use(Router)

export default new Router({
    routes: [{
        path: "/",
        name: "Dashboard",
        component: Dashboard
    }, {
        path: "/project/:projectID",
        name: "Project",
        component: Project,
        props: true
    }]
})

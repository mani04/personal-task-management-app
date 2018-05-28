// This utility function returns a unique URL friendly representation of project
// For example, "Frontend Development" gets converted as "frontend-development"
export default function (baseString) {
    return baseString.replace(/[^0-9a-zA-Z- ]/g, "").trim().replace(/\s+/g, "-").toLowerCase()
}

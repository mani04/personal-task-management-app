// This utility function returns a random string of "len" digits
// Ref: https://stackoverflow.com/a/8084248/654825
export default function (len) {
    return Math.random().toString(10).substring(2, 2 + len)
}

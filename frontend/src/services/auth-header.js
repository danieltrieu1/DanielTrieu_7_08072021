export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user && user.data.accessToken) {
        return { Authorization: user.data.accessToken }
    } else {
        return {}
    }
}

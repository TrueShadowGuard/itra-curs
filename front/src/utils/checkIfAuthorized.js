export default function(response, setAuth) {
    if(response?.status === 401) {
        localStorage.removeItem('token')
        setAuth(null)
        return false
    }
    return true
}

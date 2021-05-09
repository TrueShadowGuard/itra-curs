export default async function (id) {
    try {
        const response = await fetch(`/api/profile/${id}`)
        return await response.json()
    } catch (e) {
        console.log(e)
    }
}

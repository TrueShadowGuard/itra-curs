export default async function getProjectCards(query) {
    const queryArray = Object.entries(query)
    try {
        let response = await fetch(`/api/projects/getProjects${query}`)
        if (!response.ok) return false
        return await response.json()
    } catch (e) {
        console.log('Failed getting project cards ', e);
        return false
    }
}

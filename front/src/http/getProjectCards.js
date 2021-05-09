export default async function getProjectCards(query) {
    console.log('query', query)
    try {
        let response = await fetch(`/api/projects/getProjects${query === null || query === undefined ? '' : '/' + query}`)
        console.log(response)
        if (!response.ok) return false
        return await response.json()
    } catch (e) {
        console.log('Failed getting project cards ', e);
        return false
    }
}

export default async function getProjectCards(offset) {
    try {
        let response = await fetch('/api/projects/getProjects')
        let json = await response.json()
        console.log('projects:', json)
        return json
    } catch (e) {
        console.log('Failed getting project cards ', e);
    }
}

export default async function(projectId) {
    return await fetch(`/api/projects/update-messages/${projectId}`, {
        method: 'GET'
    })
}

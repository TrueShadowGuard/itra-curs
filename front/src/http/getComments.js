export default async function(projectId) {
    return await fetch(`/api/projects/get-messages/${projectId}`, {
        method: 'GET'
    })
}

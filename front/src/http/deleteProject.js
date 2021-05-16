export default async function (projectId, Authorization) {
    try {
        return await fetch(`/api/projects/delete-project`, {
            method: 'DELETE',
            headers: {
                Authorization,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id: projectId})
        })
    } catch (e) {
        console.log('Failed creating project ', e);
    }
}

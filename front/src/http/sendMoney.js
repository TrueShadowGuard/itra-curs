export default async function(projectId, amount) {
    const Authorization = localStorage.getItem('token')
    return await fetch(`/api/projects/send-money/${projectId}`, {
        method: 'POST',
        headers: {
            Authorization,
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({amount})
    })
}

export default async function(projectId, message) {
    console.log('comment project id', projectId)
    const Authorization = localStorage.getItem('token')
    console.log('sendComment', Authorization, projectId, message)
    return await fetch(`/api/projects/send-message/${projectId}`, {
        method: 'POST',
        headers: {
            Authorization,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({message})
    })
}

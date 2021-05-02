export default async function createProject(body, Authorization) {
    try {
        const response = await fetch(`/api/profile/create-project`, {
            method: 'POST',
            headers: {
                Authorization,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        });
        return response
    } catch (e) {
        console.log('Failed creating project ', e);
    }
}

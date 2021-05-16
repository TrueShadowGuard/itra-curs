import checkIfAuthorized from "../utils/logoutIfUnauthtorized";

export default async function editProject(projectId, values, Authorization, setAuth) {
    try {
        const response = await fetch(`/api/profile/edit-project`, {
            method: 'POST',
            headers: {
                Authorization,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({values, id: projectId})
        });
        checkIfAuthorized(response, setAuth)
        return response
    } catch (e) {
        console.log('Failed creating project ', e);
    }
}

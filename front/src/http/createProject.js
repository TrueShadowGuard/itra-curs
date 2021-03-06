import checkIfAuthorized from "../utils/logoutIfUnauthtorized";

export default async function createProject(body, Authorization, setAuth) {
    try {
        const response = await fetch(`/api/profile/create-project`, {
            method: 'POST',
            headers: {
                Authorization,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        });
        checkIfAuthorized(response, setAuth)
        return response
    } catch (e) {
        console.log('Failed creating project ', e);
    }
}

import checkIfAuthorized from "../utils/logoutIfUnauthtorized";

export default async function (projectId, amount, bonusId, setAuth) {
    const Authorization = localStorage.getItem('token')
    const body = (bonusId ? {amount, bonusId} : {amount})
    body.amount = body.amount || 10
    try {
        const response = await fetch(`/api/projects/send-money/${projectId}`, {
            method: 'POST',
            headers: {
                Authorization,
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(body)
        })
        checkIfAuthorized(response, setAuth)
        return response
    } catch (e) {
        console.log(e)
    }
}

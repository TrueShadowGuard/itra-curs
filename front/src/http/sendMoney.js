import checkIfAuthorized from "../utils/checkIfAuthorized";

export default async function (projectId, amount, setAuth) {
    const Authorization = localStorage.getItem('token')
    try {
        const response = await fetch(`/api/projects/send-money/${projectId}`, {
            method: 'POST',
            headers: {
                Authorization,
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({amount})
        })
        checkIfAuthorized(response, setAuth)
        return response
    } catch (e) {
        console.log(e)
    }
}

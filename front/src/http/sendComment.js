import checkIfAuthorized from "../utils/checkIfAuthorized";

export default async function (projectId, message, setAuth) {
    const Authorization = localStorage.getItem('token')
    try {
        const response = await fetch(`/api/projects/send-message/${projectId}`, {
            method: 'POST',
            headers: {
                Authorization,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({message})
        })
        checkIfAuthorized(response, setAuth)
        return response
    } catch (e) {
        console.log(e)
    }
}

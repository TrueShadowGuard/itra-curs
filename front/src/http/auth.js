export async function register(form) {
    try {
        let res = await fetch('/api/auth/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(form)
        })
        if(res.ok) return await res.json();
    } catch(e) {
        console.log(e)
    }
}

export async function login(form) {
    try {
        let res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(form)
        })
        if(res.ok) return await res.json();
    } catch(e) {
        console.log(e)
    }
}


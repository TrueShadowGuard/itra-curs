import {Button} from "react-bootstrap";
import React, {useContext, useState} from "react";
import sendMoney from "../../http/sendMoney";
import {Auth} from '../../App'
import {NavLink} from "react-router-dom";


export default function SupportProjectButton({projectId, addMoney}) {
    const {auth, setAuth} = useContext(Auth)
    const [fetching, setFetching] = useState(false)
    return <div style={{width: '100%'}}>
        <Button style={{width: '100%'}}
                onClick={supportProject.bind(null, projectId, setFetching, addMoney, setAuth)}
                disabled={!auth?.token || fetching}
        >
            Support project
        </Button>
        {!auth?.token && <NavLink to="/login">You must login to support</NavLink>}
    </div>
}

async function supportProject(projectId, setFetching, addMoney, setAuth) {
    setFetching(true)
    const response = await sendMoney(projectId, 10, setAuth)
    if (response.ok) addMoney(10)
    setFetching(false)
}

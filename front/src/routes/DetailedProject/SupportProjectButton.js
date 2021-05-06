import {Button} from "react-bootstrap";
import React, {useContext, useState} from "react";
import sendMoney from "../../http/sendMoney";
import {Auth} from '../../App'


export default function SupportProjectButton({projectId, addMoney}) {
    const {auth, setAuth} = useContext(Auth)
    const [fetching, setFetching] = useState(false)
    return <div style={{width: '100%'}}>
        <Button style={{width: '100%'}} onClick={supportProject.bind(null, projectId, setFetching, addMoney)}
                        disabled={!auth?.token || fetching}>Support project</Button>
        <div>You must login to support</div>
    </div>
}

async function supportProject(projectId, setFetching, addMoney) {
    setFetching(true)
    const response = await sendMoney(projectId, 10)
    if (response.ok) addMoney(10)
    setFetching(false)
}

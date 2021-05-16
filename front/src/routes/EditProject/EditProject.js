import React, {useEffect, useState} from 'react'
import CreateOrEditProject from "../CreateProject/CreateOrEditProject";
import getDetailedProject from "../../http/getDetailedProject";
import Loading from "../../utils/Loading";
import editProject from "../../http/editProject";

export default function ({match}) {
    const projectId = match.params.id
    const [values, setValues] = useState(undefined)

    useEffect(() => {
        getDetailedProject(projectId).then(vals => {
            setValues({...vals, money: vals.totalMoney})
        })
    }, [])

    return (
        values === undefined ? <div className="d-flex justify-content-center mt-5"><Loading/></div> :
            <CreateOrEditProject initialValues={values} editProject={editProject.bind(null, projectId)}/>
    )
}

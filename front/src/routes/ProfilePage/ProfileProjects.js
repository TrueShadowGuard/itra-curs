import React, {useState} from 'react'
import {Button, Col, ProgressBar, Row, Table} from "react-bootstrap"
import {NavLink} from "react-router-dom"
import Edit from './edit.svg'
import Delete from './delete.svg'

const svgStyle = {
    cursor: 'pointer'
}

const ProfileProjects = ({projects}) => {
    const [table, setTable] = useState(projects)
    const [query, setQuery] = useState('')
    const [sortType, setSortType] = useState()
    console.log('table', table, 'sortType', sortType)
    return (
        <div>
            <h2>Projects:</h2>
            <Row className="mb-3">
                <Col lg={2}><input value={query}
                                   onChange={e => setQuery(e.target.value)}
                                   className="form-control"
                                   placeholder="Search"/>
                </Col>
            </Row>
            <Table striped bordered>
                <thead>
                <tr>
                    <th style={{cursor: 'pointer'}} onClick={sort.bind(null, 'name')}>Project name</th>
                    <th>Progress</th>
                </tr>
                </thead>
                <tbody>
                {projects
                    .filter(project => project.name.toLowerCase().indexOf(query.toLowerCase()) > -1)
                    .map((project, i) =>
                        <tr key={i}>
                            <td className="d-flex justify-content-between">
                                <div>
                                    <img src={Edit}
                                         alt=""
                                         width="20px"
                                         height="20px"
                                         style={svgStyle}
                                         className="mr-1"
                                         onClick={editProject.bind(null, project)}/>
                                    <NavLink to={`/projects/${project.id}/comments`}>{project.name}</NavLink>
                                </div>
                                <img src={Delete}
                                     alt=""
                                     width="30px"
                                     height="30px"
                                     style={svgStyle}
                                     className="mr-1"
                                     onClick={editProject.bind(null, project)}/>
                            </td>
                            <td>
                                <ProgressBar now={project.money / project.totalMoney * 100}/>
                            </td>
                        </tr>)
                }
                </tbody>
            </Table>
        </div>
    );

    function sort(field) {
        switch (sortType) {
            case undefined:
            case 1:
                setSortType(0)
                setTable(table.sort(ascendingOrder.bind(null, field)))
                break;
            case 0:
                setSortType(1)
                setTable(table.sort(descendingOrder.bind(null, field)))
                break;
        }
    }
};

function ascendingOrder(field, s1, s2) {
    return s1[field] > s2[field] ? 1 : -1
}

function descendingOrder(field, s1, s2) {
    return s1[field] < s2[field] ? -1 : -1
}

function editProject() {

}


export default ProfileProjects;

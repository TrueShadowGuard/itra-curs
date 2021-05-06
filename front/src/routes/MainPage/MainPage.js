import React, {useEffect, useState} from 'react';
import './mainPage.module.css';
import {Col, Row} from "react-bootstrap";
import ProjectCard from "../../projectCard/ProjectCard";
import getProjectCards from "../../http/getProjectCards";
import ServerError from "../../utils/ServerError";
import Loading from "../../utils/Loading";
import useQuery from "../../utils/useQuery";

let col = {
    display: 'flex',
    justifyContent: 'center'
}
const MainPage = ({match}) => {
    const [data, setData] = useState(undefined);
    const query = useQuery()
    useEffect(() => {
        console.log(10)
        getProjectCards(query.get('q')).then(setData);
    }, [])
    return (
        <div className="container-fluid">
            <Row>
                {data === undefined ? <Col className="d-flex justify-content-center mt-5"><Loading/></Col> :
                    data === false ? <ServerError/> :
                    data.map(cardData =>
                        <Col lg={3} md={6}>
                            <ProjectCard card={cardData}/>
                        </Col>)}
            </Row>
        </div>
    );
};

export default MainPage;

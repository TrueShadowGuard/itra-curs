import React, {useEffect, useState} from 'react';
import './mainPage.module.css';
import {Col, Row} from "react-bootstrap";
import ProjectCard from "../../projectCard/ProjectCard";
import getProjectCards from "../../http/getProjectCards";

let col = {
    display: 'flex',
    justifyContent: 'center'
}
const MainPage = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getProjectCards().then(setData);
    },[])
    return (
        <div className="container-fluid">
            <Row>
                {data.map(cardData =>
                    <Col lg={3}>
                        <ProjectCard card={cardData}/>
                    </Col>)}
            </Row>
        </div>
    );
};

export default MainPage;

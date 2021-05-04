import React, {useEffect, useState} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import getDetailedProject from "../http/getDetailedProject";
import YTVideo from "./YTVideo";
import Links from "./Links";
import Routes from "./Routes";
import Bonuses from "./Bonuses";
import MoneyInicator from "./MoneyIndicator";
import {useHistory} from "react-router";
import NotFound from "../routes/ProfilePage/NotFound";

const DetailedProject = ({match}) => {
    const [data, setData] = useState(undefined);
    const history = useHistory()
    console.log('Project data', data)
    useEffect(async () => {
        const newData = await getDetailedProject(match.params.id);
        setData(newData);
    }, []);

    if(data === null) return <NotFound text="Project" />
    if(data) {
        var {
            name,
            bonuses,
            money,
            totalMoney,
            description,
            tags,
            id,
            creatingDate,
            endingDate,
            comments,
            video
        } = data;
    }

    return (
        data !== undefined &&
        <div className="container-fluid">
            <h1 className="offset-1">{name}</h1>
            <Row>
                <Col lg={6} className="offset-lg-1">
                    <YTVideo videoId={video}/>
                </Col>
                <Col lg={3} className="p-3">
                    <Row>
                        <Col>
                            <MoneyInicator money={money} totalMoney={totalMoney}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>Starting date: {creatingDate?.split('T')[0]}</Col>
                    </Row>
                    <Row>
                        <Col>Ending date: {endingDate?.split('T')[0]}</Col>
                    </Row>
                    <Row className="mt-2">
                        <Col lg={12} className="d-flex justify-content-center">
                            <Button style={{width: '100%'}}>Support project</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <NavLink to={'/'}>category</NavLink>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <hr className="mt-lg-5"/>
            <Row>
                <Col lg={3} className="offset-lg-1">
                    <Links/>
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col lg={6} className="offset-lg-1">
                    <Routes id={match.params.id}
                            description={description}
                            comments={comments}
                            />
                </Col>
                <Col lg={3}>
                    <Bonuses bonuses={bonuses} className="p-3"/>
                </Col>
            </Row>
        </div>
    );
};

export default DetailedProject;


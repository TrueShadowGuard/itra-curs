import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import getDetailedProject from "../../http/getDetailedProject";
import YTVideo from "./YTVideo";
import Links from "./Links";
import Routes from "./Routes";
import Bonuses from "./Bonuses";
import MoneyInicator from "./MoneyIndicator";
import {useHistory} from "react-router";
import NotFound from "../../utils/NotFound";
import Loading from "../../utils/Loading";
import SupportProjectButton from "./SupportProjectButton";
import sendMoney from "../../http/sendMoney";
import {Auth} from "../../App";

const DetailedProject = ({match}) => {
    const [data, setData] = useState(undefined);
    const history = useHistory()
    const {setAuth} = useContext(Auth)

    useEffect( () => {
        getDetailedProject(match.params.id)
            .then(setData)
    }, []);

    if (data === null) return <NotFound text="Project" />
    if(data) {
        var {
            name,
            bonuses,
            images,
            money,
            totalMoney,
            description,
            tags,
            id,
            creatingDate,
            endingDate,
            comments,
            video,
            category
        } = data;
    }
    console.log('initialComments', comments)
    return (
        data === undefined ?
        <div className="d-flex justify-content-center mt-5"><Loading/></div> :
        <div className="container-fluid pb-5">
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
                            <SupportProjectButton projectId={id}
                                                  addMoney={addMoney}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <NavLink to={'/'}>{category}</NavLink>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <hr className="mt-lg-5"/>
            <Row>
                <Col lg={4} className="offset-lg-1">
                    <Links/>
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col lg={6} className="offset-lg-1">
                    <Routes id={match.params.id}
                            description={description}
                            initialComments={comments}
                            images={images}
                            />
                </Col>
                <Col lg={3}>
                    <Bonuses bonuses={bonuses} className="p-3" sendMoney={async (amount, bonusId) => {
                        const response = await sendMoney(id, amount, bonusId, setAuth)
                        if(response.ok) addMoney(amount)
                    }}/>
                </Col>
            </Row>
        </div>
    );

    function addMoney(amount) {
        setData({...data, money: data.money + amount})
    }
};

export default DetailedProject;


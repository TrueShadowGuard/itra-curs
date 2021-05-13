import React, {useEffect, useState} from 'react';
import './mainPage.module.css';
import {Button, Col, Row} from "react-bootstrap";
import ProjectCard from "../../projectCard/ProjectCard";
import getProjectCards from "../../http/getProjectCards";
import ServerError from "../../utils/ServerError";
import Loading from "../../utils/Loading";
import getQueryObject from "../../utils/getQueryObject";
import {useHistory} from "react-router";
import getQueryStringFromObject from "../../utils/getQueryStringFromObject";

let col = {
    display: 'flex',
    justifyContent: 'center'
}
const MainPage = ({match}) => {
    const [data, setData] = useState(undefined)
    const history = useHistory()
    const queryObject = getQueryObject()


    console.log('query object', queryObject)
    if (!queryObject.page || !queryObject.count) history.push('/?page=0&count=4')

    useEffect(() => {
        getProjectCards(window.location.search).then(setData);
    }, [window.location.search])

    return (
        <div className="container-fluid">
            {data === undefined ? <Col className="d-flex justify-content-center mt-5"><Loading/></Col> :
                data === false ? <ServerError/> :
                    <div>
                        {queryObject.q && <div>Results for search: {queryObject.q}</div>}
                        <Row>
                            {data.map(cardData =>
                            <Col lg={3} md={6}>
                                <ProjectCard card={cardData}/>
                            </Col>)}
                        </Row>
                        <Row>
                            <Col className="mt-2">
                                <Button onClick={goToPrevPage} className="mr-2">Previous page</Button>
                                <Button onClick={goToNextPage}>Next page</Button>
                            </Col>
                        </Row>
                    </div>}
        </div>
    );
    function goToNextPage() {
        const newQueryObject = ({...queryObject})
        newQueryObject.page = +newQueryObject.page + 1
        history.push(getQueryStringFromObject(newQueryObject))
    }
    function goToPrevPage() {
        if(+queryObject.page === 0) return;
        const newQueryObject = ({...queryObject})
        newQueryObject.page = +newQueryObject.page - 1
        history.push(getQueryStringFromObject(newQueryObject))
    }
};

export default MainPage;

import React from 'react';
import {Button, Card, ProgressBar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const ProjectCard = ({card}) => {
    const {money, totalMoney, preview, description, name, tags, id} = card;
    const percent = Math.trunc(money / totalMoney * 100)
    return (
        <Card className="mt-3">
            <Card.Img variant="top"
                      src={preview}/>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
                <ProgressBar animated now={percent} />
                <hr/>
                <div className="text-center">
                    Collected {money}$<br/>{percent}%
                </div>
                <div className="d-flex justify-content-center">
                    <NavLink to={"/projects/" + id + "/"} className="mt-2 btn btn-outline-primary">Read more</NavLink>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProjectCard;

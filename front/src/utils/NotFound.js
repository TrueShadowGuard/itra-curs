import React from 'react';
import {Container} from "react-bootstrap";

const NotFound = ({text}) => {
    return (
        <Container className="text-center mt-2">
            <h1>404</h1>
            <div>{text} not found</div>
        </Container>
    );
};

export default NotFound;

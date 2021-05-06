import React from 'react';
import {Container} from "react-bootstrap";

const ServerError = () => {
    return (
        <Container className="text-center mt-2">
            <h1>500</h1>
            <div>Server error. Please, try again later</div>
        </Container>
    );
};

export default ServerError;

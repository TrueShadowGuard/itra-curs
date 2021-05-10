import React from 'react';
import Svg from "./iconfinder_Error_381599.svg";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

const renderTooltip = (text) => {
    return (
        <Tooltip id="button-tooltip">
            {text}
        </Tooltip>
    );
}

const FormFieldError = ({text}) => {
    return (
        <OverlayTrigger
            placement="left"
            delay={{ show: 150, hide: 150 }}
            overlay={renderTooltip(text)}
        >
            <img src={Svg} alt="" width='20px' height='20px'/>
        </OverlayTrigger>
    );
};

export default FormFieldError;

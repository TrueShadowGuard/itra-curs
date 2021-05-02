import React from 'react';
import {NavLink} from "react-router-dom";

export default function Links() {
    return (
        <div className="d-flex justify-content-between">
            <NavLink exact to={'./'} className="nav-link"
                     activeStyle={{textDecoration: 'underline'}}>Description</NavLink>
            <NavLink exact to={'news'} className="nav-link"
                     activeStyle={{textDecoration: 'underline'}}>News</NavLink>
            <NavLink exact to={'comments'} className="nav-link"
                     activeStyle={{textDecoration: 'underline'}}>Comments</NavLink>
            <NavLink exact to={'gallery'} className="nav-link"
                     activeStyle={{textDecoration: 'underline'}}>Gallery</NavLink>
        </div>
    );
};

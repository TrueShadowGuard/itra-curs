import React, {useContext} from 'react';
import {Button, FormControl, Nav, Navbar} from "react-bootstrap";
import {Form} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import ProfileLink from "./ProfileLink";
import {Auth} from '../App';
import SearchField from "./SearchField";

const NavBar = () => {
    const {auth} = useContext(Auth)

    return (
        <Navbar bg="primary" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink exact to="/"
                             className="nav-link"
                             activeStyle={{textDecoration: 'underline', color: '#eee'}}>Home</NavLink>
                    <NavLink exact to="/about"
                             className="nav-link"
                             activeStyle={{textDecoration: 'underline', color: '#eee'}}>About</NavLink>
                    {auth ? <ProfileLink/> :
                        <NavLink to="/login"
                                 className="nav-link"
                                 activeStyle={{textDecoration: 'underline', color: '#eee'}}>Login</NavLink>
                    }
                </Nav>
                <SearchField/>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;

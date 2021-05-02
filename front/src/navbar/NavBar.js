import React, {useContext} from 'react';
import {Button, FormControl, Nav, Navbar} from "react-bootstrap";
import {Form} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import Avatar from "./Avatar";
import {Auth} from '../App';

const NavBar = () => {

    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">People</Navbar.Brand>
            <Nav className="mr-auto">
                <NavLink exact to="/" className="nav-link">Home</NavLink>
                <NavLink to="/about" className="nav-link">About</NavLink>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                <Button variant="outline-light">Search</Button>
                <Avatar/>
            </Form>
        </Navbar>
    );
};

export default NavBar;

import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {Auth} from "../App";

const ProfileLink = ({url}) => {
    const {auth} = useContext(Auth)

    return (
        <NavLink to={auth ? `/profiles/${auth.id}` : '/login'}
                 className="nav-link"
                 activeStyle={{textDecoration: 'underline', color: '#eee'}}>
            My profile
        </NavLink>
    );
};

export default ProfileLink;

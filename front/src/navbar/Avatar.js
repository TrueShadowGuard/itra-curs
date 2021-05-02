import React, {useContext} from 'react';
import Svg from './avatar-svgrepo-com.svg';
import {NavLink} from "react-router-dom";
import {Auth} from "../App";

const style = {
    borderRadius: '50%',
    overflow: 'hidden'
}

const Avatar = ({url}) => {
    const {auth} = useContext(Auth)

    return (
        <NavLink to={auth ? `/profiles/${auth.id}` : '/login'} className="ml-2" style={style}>
            <img src={url || Svg} alt="" width='40'/>
        </NavLink>
    );
};

export default Avatar;

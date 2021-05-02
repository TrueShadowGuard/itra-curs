import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import getProfilePage from "../../http/getProfilePage";
import {NavLink} from "react-router-dom";
import ProfileBonus from "./ProfileBonus";
import ProfileProjects from "./ProfileProjects";
import NotFound from "./NotFound";
import Loading from "../../utils/Loading";

const ProfilePage = ({match}) => {
    const [profile, setProfile] = useState(undefined);
    useEffect(async () => setProfile(await getProfilePage(match.params.id)), []);
    return (profile === undefined ? <div className="d-flex justify-content-center mt-5"><Loading/></div> :
            profile === null ? <NotFound text="Profile"/> :
                <div className="p-4">
                    <div className="d-flex align-items-center flex-wrap">
                        <h1>My bonuses:</h1>
                        {profile?.bonuses?.map(bonus => <ProfileBonus bonus={bonus}/>)}
                    </div>
                    <hr className="mt-4"/>
                    <ProfileProjects projects={profile?.projects}/>
                    <NavLink to="/create-project" className="btn btn-primary">Create Project</NavLink>
                </div>
    );
};

export default ProfilePage;

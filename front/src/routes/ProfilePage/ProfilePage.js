import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import getProfilePage from "../../http/getProfilePage";
import {NavLink} from "react-router-dom";
import ProfileBonus from "./ProfileBonus";
import ProfileProjects from "./ProfileProjects";
import NotFound from "../../utils/NotFound";
import Loading from "../../utils/Loading";
import {Auth} from "../../App";

const ProfilePage = ({match}) => {
    const [profile, setProfile] = useState(undefined);
    const {auth, setAuth} = useContext(Auth)
    const isMyProfile = +auth?.id === +match.params.id

    useEffect(async () => setProfile(await getProfilePage(match.params.id)), []);
    return (profile === undefined ? <div className="d-flex justify-content-center mt-5"><Loading/></div> :
            profile === null ? <NotFound text="Profile"/> :
                <div className="p-4">
                    <h1>{profile.name}</h1>
                    <hr/>
                    {isMyProfile &&
                    <div className="d-flex justify-content-end">
                        <Button variant="outline-primary" onClick={logout.bind(null, setAuth)}>Logout</Button>
                    </div>}
                    <div className="d-flex align-items-center flex-wrap">
                        <h2>Bonuses:</h2>
                        {profile.bonuses?.length === 0 ? <div className="ml-2">Don't have yet</div> :
                            profile?.bonuses?.map(bonus => <ProfileBonus bonus={bonus}/>)}
                    </div>
                    <hr className="mt-4"/>
                    <ProfileProjects projects={profile.projects} isMyProfile={isMyProfile}/>
                    {isMyProfile && <NavLink to="/create-project" className="btn btn-primary">Create Project</NavLink>}
                    <hr/>
                </div>
    );
};

function logout(setAuth) {
    localStorage.removeItem('token')
    setAuth(null)
}

export default ProfilePage;

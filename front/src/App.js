import React, {useContext, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import MainPage from "./routes/MainPage/MainPage";
import LoginPage from "./routes/LoginPage/LoginPage";
import NavBar from "./navbar/NavBar";
import AboutPage from "./routes/AboutPage/AboutPage";
import DetailedProject from "./routes/DetailedProject/DetailedProject";
import ProfilePage from "./routes/ProfilePage/ProfilePage";
import CreateOrEditProject from "./routes/CreateProject/CreateOrEditProject";
import RegisterPage from "./routes/RegisterPage/RegisterPage";
import {useHistory} from "react-router";
import EditProject from "./routes/EditProject/EditProject";

export const Auth = React.createContext(null)

function App() {
    const [auth, setAuth] = useState((() => {
            let token = localStorage.getItem('token');
            let id = localStorage.getItem('id');
            let userName = localStorage.getItem('userName')
            return (token && id) ? {token, id, userName} : null
        })()
    );

    return (
        <BrowserRouter>
            <Auth.Provider value={{auth, setAuth}}>
                <NavBar/>
                <Switch>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/register" component={RegisterPage}/>
                    <Route path="/about" component={AboutPage}/>
                    <Route path="/projects/:id" component={DetailedProject}/>
                    <Route path="/profiles/:id" component={ProfilePage}/>
                    <Route path="/create-project" component={CreateOrEditProject}/>
                    <Route path="/edit-project/:id" component={EditProject}/> />
                    <Route path="/" component={MainPage}/>
                    <Redirect to="/"/>
                </Switch>
            </Auth.Provider>
        </BrowserRouter>
    );

}

export default App;

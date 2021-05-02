import React, {useContext, useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import MainPage from "./routes/MainPage/MainPage";
import LoginPage from "./routes/LoginPage/LoginPage";
import NavBar from "./navbar/NavBar";
import AboutPage from "./routes/AboutPage/AboutPage";
import DetailedProject from "./detailedProject/DetailedProject";
import ProfilePage from "./routes/ProfilePage/ProfilePage";
import CreateProject from "./routes/CreateProject/CreateProject";
import RegisterPage from "./routes/RegisterPage/RegisterPage";

export const Auth = React.createContext(null)

function App() {
    const [auth,setAuth] = useState(null);

    return (
        <BrowserRouter>
            <Auth.Provider value={{auth,setAuth}}>
                <NavBar/>
                <Switch>
                    <Route exact path="/" component={MainPage}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/register" component={RegisterPage}/>
                    <Route path="/about" component={AboutPage}/>
                    <Route path="/projects/:id" component={DetailedProject}/>
                    <Route path="/profiles/:id" component={ProfilePage}/>
                    <Route path="/create-project" component={CreateProject}/>
                    <Redirect to="/"/>
                </Switch>
            </Auth.Provider>
        </BrowserRouter>
    );

}

export default App;

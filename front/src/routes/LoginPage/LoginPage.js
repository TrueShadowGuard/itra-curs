import React, {useContext} from 'react';
import {ErrorMessage, Formik, Field} from 'formik';
import {Button, Col, Form, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import s from './loginPage.module.css';
import {login} from '../../http/auth';
import {NavLink} from "react-router-dom";
import {Auth} from "../../App";
import {useHistory} from "react-router";

const LoginPage = () => {
    const {auth, setAuth} = useContext(Auth)
    const history = useHistory()
    return (
        <div>
            <Formik
                initialValues={{email: '', password: ''}}
                validate={({email, password}) => {
                    const errors = {};
                    if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                        .test(email)) {
                        errors.email = 'Invalid email'
                    }
                    if(!password) errors.password = 'Password is empty'
                    return errors
                }}
                onSubmit={async (values, {setSubmitting}) => {
                    const auth = await login(values);
                    if (auth.token) {
                        auth.token = 'Bearer ' + auth.token;
                        setAuth(auth);
                        history.push(`/profiles/${auth.id}`)
                    }
                    setSubmitting(false);
                }}
            >
                {({isSubmitting, handleSubmit}) => (
                    <Form onSubmit={handleSubmit} className={'container ' + s.form}>
                        <Field
                            type="email"
                            name="email"
                            placeholder='Email'
                            className="form-control"/>
                        <Field
                            type="password"
                            name="password"
                            placeholder='Password'
                            className="form-control"
                        />
                        <ErrorMessage name="name" component="div"/>
                        <ErrorMessage name="email" component="div"/>
                        <ErrorMessage name="password" component="div"/>
                        <Button type="submit" className={s.submit} disabled={isSubmitting}>Login</Button>
                        <NavLink to="/register"><small>register</small></NavLink>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginPage;

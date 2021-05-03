import React, {useContext} from 'react';
import {ErrorMessage, Formik, Field} from 'formik';
import {Button, Col, Form, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import s from './registerPage.module.css';
import {register} from '../../http/auth';
import {NavLink} from "react-router-dom";
import {useHistory} from "react-router";
import {Auth} from "../../App";

const RegisterPage = () => {
    const history = useHistory();
    const {auth, setAuth} = useContext(Auth)
    return (
        <div>
            <Formik
                initialValues={{email: '', password: '', name: ''}}
                validate={({email, password, name}) => {
                    const errors = {};
                    if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                        .test(email)) {
                        errors.email = 'Invalid email'
                    }
                    if (!password) errors.password = 'Password is empty'
                    if(!name) errors.name = 'Username is required'
                    return errors
                }}
                onSubmit={async (values, {setSubmitting}) => {
                    let response = await register(values)
                    if(response.ok) {

                    }
                    setSubmitting(false);
                }}
            >
                {({isSubmitting, handleSubmit}) => (
                    <Form onSubmit={handleSubmit} className={'container ' + s.form}>
                        <Field
                            type="text"
                            name="name"
                            placeholder="Username"
                            className="form-control"/>
                        <Field
                            type="email"
                            name="email"
                            placeholder={'Email'}
                            className="form-control"/>
                        <Field
                            type="password"
                            name="password"
                            placeholder={'Password'}
                            className="form-control"
                        />
                        <Button type="submit" className={s.submit} disabled={isSubmitting}>Register</Button>
                        <ErrorMessage name="email" component="div"/>
                        <ErrorMessage name="password" component="div"/>
                        <NavLink to="/login"><small>login</small></NavLink>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterPage;

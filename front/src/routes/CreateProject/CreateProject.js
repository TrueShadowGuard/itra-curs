import React, {useContext, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {Button, Card, Accordion} from "react-bootstrap";
import BasicInformation from "./BasicInformation";
import createProject from "../../http/createProject";
import {Auth} from "../../App";
import {useHistory} from "react-router";
import {NavLink} from "react-router-dom";

export default function CreateProject() {
    const {auth} = useContext(Auth)
    const [images, setImages] = useState([])
    const history = useHistory()
    return (
        <div>
            <Formik
                initialValues={{
                    name: '',
                    money: 1,
                    video: 'dvvd',
                    description: 'vd',
                    imagePreview: null,
                    textPreview: '',
                    images,
                    date: new Date()
                }}
                validate={values => {
                    const errors = {};
                    if (!values.name) errors.name = 'Required';
                    if (!values.money) errors.money = 'Required';
                    else if (+values.money <= 0) errors.money = 'Must be positive'
                    if (!values.video) errors.video = 'Required';
                    if (!values.description) errors.description = 'Required';
                    return errors;
                }}
                onSubmit={async (values, {setSubmitting}) => {
                    setSubmitting(true)
                    try {
                        console.log(values)
                        // const response = await createProject({...values, images}, auth?.token)
                        // const json = await response.json()
                        // if (response.ok) history.push(`/projects/${json.id}/`)
                    } catch (e) {
                        console.log(e)
                    } finally {
                        setSubmitting(false)
                    }
                }}
            >
                {({isSubmitting, handleSubmit, setFieldValue}) => (
                    <Form className="m-2" onSubmit={handleSubmit}>
                        <Accordion defaultActiveKey="1">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        Basic information
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        <div className="d-flex flex-row flex-wrap align-items-center">
                                            <BasicInformation/>
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        Gallery Images
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>

                        <Button type="submit" className="mt-2" disabled={isSubmitting || !auth?.token}>Create</Button>
                        {!auth?.token &&
                        <NavLink to="/login" className="ml-3">You must login to create project</NavLink>}
                    </Form>
                )}
            </Formik>
        </div>
    );
}

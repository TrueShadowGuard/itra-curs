import React, {useContext, useState} from 'react';
import {Formik, Form} from 'formik';
import {Button, Card, Accordion} from "react-bootstrap";
import BasicInformation from "./BasicInformation";
import createProject from "../../http/createProject";
import {Auth} from "../../App";
import {useHistory} from "react-router";
import {NavLink} from "react-router-dom";
import Loading from "../../utils/Loading";
import CreateBonuses from "./CreateBonuses";
import CreateGallery from "./CreateGallery";

export default function CreateOrEditProject({initialValues, editProject}) {
    const {auth, setAuth} = useContext(Auth);
    const [fetching, setFetching] = useState(false);
    const history = useHistory();
    return (
        <div>
            <Formik
                initialValues={initialValues ||
                {
                    name: '',
                    money: '',
                    video: '',
                    description: '',
                    imagePreview: '',
                    textPreview: '',
                    images: [],
                    bonuses: [],
                    category: '',
                    date: new Date()
                }}
                validate={values => {
                    const errors = {};
                    if (!values.name) errors.name = 'Required';
                    if (!values.money) errors.money = 'Required'; else if (+values.money <= 0) errors.money = 'Must be positive';
                    if (!values.video) errors.video = 'Required';
                    if (!values.description) errors.description = 'Required';
                    if (!values.textPreview) errors.textPreview = 'Required';
                    if (!values.category || values.category === 'Select') errors.category = 'Required';
                    return errors;
                }}
                onSubmit={async (values, {setSubmitting}) => {
                    setFetching(true)
                    try {
                        const response = initialValues ?
                            await editProject(values, auth?.token, setAuth) :
                            await createProject(values, auth?.token, setAuth)
                        const json = await response.json()
                        if (response.ok) history.push(`/projects/${json.id}/`)
                    } finally {
                        setFetching(false)
                    }
                }}
            >
                {({isSubmitting, handleSubmit, setFieldValue, values}) => (
                    <Form className="m-2" onSubmit={handleSubmit}>
                        <Accordion defaultActiveKey="0">

                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">Basic
                                        information</Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <div className="d-flex flex-row flex-wrap align-items-center">
                                            <BasicInformation setFieldValue={setFieldValue}/>
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>

                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">Gallery
                                        Images</Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        <CreateGallery setFieldValue={setFieldValue} images={values.images}/>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>

                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="2">Bonuses</Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2">
                                    <Card.Body>
                                        <CreateBonuses setFieldValue={setFieldValue} bonuses={values.bonuses}/>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>

                        </Accordion>
                        <div className="d-flex align-items-center">
                            <Button type="submit"
                                    className="mt-2"
                                    disabled={fetching || !auth?.token}>{initialValues ? 'Save' : 'Create'}</Button>
                            {fetching && <Loading/>}
                        </div>
                        {!auth?.token &&
                        <NavLink to="/login" className="ml-3">You must login to create project</NavLink>}
                    </Form>
                )}
            </Formik>
        </div>
    );
}

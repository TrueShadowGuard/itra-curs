import React, {useState} from 'react';
import {ErrorMessage, Field} from "formik";
import s from "./createProject.module.css";
import FormFieldError from "../../utils/FormFieldError";
import {Form} from 'react-bootstrap';

const BasicInformation = ({setFieldValue}) => {
    return (
        <React.Fragment>
            <Field
                type="text"
                name="name"
                placeholder="Project name"
                className={"form-control mt-1 " + s.field}
            />
            <ErrorMessage name="name">
                {msg => <FormFieldError text={msg}/>}
            </ErrorMessage>
            <Field
                type="number"
                min={1}
                name="money"
                placeholder="Money in у.е."
                className={"form-control mt-1 " + s.field}
            />
            <ErrorMessage name="money">
                {msg => <FormFieldError text={msg}/>}
            </ErrorMessage>
            <Field
                type="text"
                className={"form-control mt-1 " + s.field}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Youtube video URL"
                inputMode="url"
                name="video"
            />
            <ErrorMessage name="video">
                {msg => <FormFieldError text={msg}/>}
            </ErrorMessage>
            <Field
                as="select"
                className={"form-control mt-1 " + s.field}
                id="exampleFormControlSelect1"
                name="category">
                <option>Education</option>
                <option>Culture</option>
                <option>Science</option>
                <option>Charity</option>
            </Field>
            <ErrorMessage name="category">
                {msg => <FormFieldError text={msg}/>}
            </ErrorMessage>

            <Field
                as="textarea"
                className={"form-control mt-1 " + s.field}
                placeholder="Preview description"
                maxLength={200}
                name="textPreview"
            />
            <ErrorMessage name="textPreview">
                {msg => <FormFieldError text={msg}/>}
            </ErrorMessage>

            <Field
                as="textarea"
                className={"form-control mt-1 " + s.field}
                placeholder="Description(Markdown)"
                maxLength={500}
                name="description"
            />
            <ErrorMessage name="description">
                {msg => <FormFieldError text={msg}/>}
            </ErrorMessage>

            <div style={{width: '100%'}}/>
            <Field
                type="date"
                name="date"
                className={"form-control mt-1 " + s.field}
            />
            <div style={{width: '100%'}}>Chose image preview. Supported formats: png, jpg. Max size 5mb</div>
            <input type="file"
                   onChange={e => handleChange(e, setFieldValue)}
                   className="mt-1"
                   accept="image/*"
            />
        </React.Fragment>
    );
}
const MAX_FILE_SIZE = 5_000_000
function handleChange(e, setFieldValue) {
    window.file = e.target.files[0]
    if(e.target.files[0].size > MAX_FILE_SIZE) return
    setFieldValue('imagePreview', e.target.files[0])
}

export default BasicInformation;

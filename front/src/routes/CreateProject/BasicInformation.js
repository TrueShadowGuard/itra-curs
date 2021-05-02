import React from 'react';
import {ErrorMessage, Field} from "formik";
import s from "./createProject.module.css";
import FormFieldError from "../../utils/FormFieldError";

const BasicInformation = () => {
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
                id="example"
                placeholder="Description(Markdown)"
                maxLength={500}
                name="description"
            />
            <ErrorMessage name="description">
                {msg => <FormFieldError text={msg}/>}
            </ErrorMessage>
        </React.Fragment>
    );
};

export default BasicInformation;

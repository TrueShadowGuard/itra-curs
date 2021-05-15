import React, {useState} from 'react';
import {ErrorMessage, Field} from "formik";
import s from "./createProject.module.css";
import FormFieldError from "../../utils/FormFieldError";

const BasicInformation = ({setFieldValue}) => {
    const fileInputRef = React.createRef()
    const fileInputDropArea = React.createRef()
    const [base64PreviewImage, setBase64PreviewImage] = useState('https://res.cloudinary.com/dngrbvlvm/image/upload/v1621006137/hrnxe0tbi2cvehvkikan.png')
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
                name="category">
                <option>Select</option>
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

            <div style={{width: '100%'}}>
                <strong>Drop image here or click</strong><br/>
                Supported formats: png, jpg.<br/> Max size 5mb
            </div>
            <label htmlFor={fileInputRef.current}
                   className="dnd-area"
                   ref={fileInputDropArea}
                   onDragStart={e => {
                       e.preventDefault()
                       e.stopPropagation()
                   }}
                   onDragEnter={e => {
                       e.preventDefault()
                       e.stopPropagation()
                       fileInputDropArea.current.classList.add('dnd-area__active');
                   }}
                   onDragLeave={e => {
                       e.preventDefault()
                       e.stopPropagation()
                       fileInputDropArea.current.classList.remove('dnd-area__active');
                   }}
                   onDragOver={e => {
                       e.preventDefault()
                       e.stopPropagation()
                   }}
                   onDrop={e => {
                       e.preventDefault()
                       e.stopPropagation()
                       setFileFieldValue(e.dataTransfer.files[0], setFieldValue)
                       fileInputDropArea.current.classList.remove('dnd-area__active');
                   }}>
                <input type="file"
                       onChange={e => handleChange(e, setFieldValue)}
                       hidden
                       accept="image/*"
                       ref={fileInputRef}
                />
            </label>
            <div className="d-flex flex-column align-items-center justify-content-start">
                <strong>Preview</strong>
            <img alt=""
                 src={base64PreviewImage}
                 height={228}
                 width={405}
                 className="dnd-img ml-2 mb-2"
                 style={{border: '1px solid #ccc'}}
            />
            </div>
        </React.Fragment>
    )

    function handleChange(e, setFieldValue) {
        console.log(e)
        if (e.target?.files[0]?.size <= MAX_FILE_SIZE) setFileFieldValue(e.target.files[0], setFieldValue)
    }

    function setFileFieldValue(file, setFieldValue) {
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.onloadend = e => {
            setFieldValue('imagePreview', fr.result)
            setBase64PreviewImage(fr.result)
        }
        fr.onerror = console.error
    }
};

const MAX_FILE_SIZE = 5_000_000;


export default BasicInformation;

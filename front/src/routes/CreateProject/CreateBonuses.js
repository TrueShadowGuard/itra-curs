import {Button, Card} from "react-bootstrap";
import React, {createRef, useState} from "react";
import {ErrorMessage, Formik} from "formik";
import createProject from "../../http/createProject";
import FormFieldError from "../../utils/FormFieldError/FormFieldError";

const MAX_FILE_SIZE_IN_MB = 5;
export default function CreateBonuses({setFieldValue, bonuses}) {
    const
        inputBonusName = createRef(),
        inputBonusDescription = createRef(),
        inputBonusMoney = createRef(),
        inputBonusImage = createRef(),
        dropArea = createRef()
    const [base64Image, setBase64Image] = useState(null)

    return (
        <Formik
            initialValues={{
                name: '',
                description: '',
                money: '',
                image: ''
            }}
            validate={values => {
                const errors = {};
                if (!values.name) errors.name = 'Required'
                if (!values.description) errors.description = 'Required'
                if (!values.money) errors.money = 'Required'
                if (!values.image) errors.image = 'Required'
                return errors;
            }}
            onSubmit={null}>
            {() => (
                <div className="d-flex flex-wrap">
                    <div>
                        <input className="form-control mb-1"
                               placeholder="Bonus name"
                               ref={inputBonusName}
                        />
                        <ErrorMessage name="name">
                            {msg => <FormFieldError text={msg}/>}
                        </ErrorMessage>
                        <input className="form-control mb-1"
                               placeholder="Bonus description"
                               ref={inputBonusDescription}
                        />
                        <input className="form-control mb-1"
                               placeholder="Bonus price"
                               ref={inputBonusMoney}
                        />
                        <ImageInput/>
                        <div>
                            <Button onClick={handleAddBonus}>Add bonus</Button>
                            <Button onClick={() => setFieldValue('bonuses', [])} className="ml-2">Clear bonuses</Button>
                        </div>
                    </div>
                    <div className="d-flex flex-wrap">
                        {bonuses?.map(bonus => <Bonus {...bonus} />)}
                    </div>
                </div>
            )}
        </Formik>)

    function handleAddBonus() {
        setFieldValue('bonuses', [...bonuses, {
            name: inputBonusName.current.value,
            description: inputBonusDescription.current.value,
            money: inputBonusMoney.current.value,
            image: base64Image
        }])
    }

    function ImageInput() {
        return (
            <div>
                <label htmlFor={inputBonusImage.current}
                       className="dnd-area"
                       ref={dropArea}
                       onDragStart={e => {
                           e.preventDefault()
                           e.stopPropagation()
                       }}
                       onDragEnter={e => {
                           e.preventDefault()
                           e.stopPropagation()
                           dropArea.current.classList.add('dnd-area__active');
                       }}
                       onDragLeave={e => {
                           e.preventDefault()
                           e.stopPropagation()
                           dropArea.current.classList.remove('dnd-area__active');
                       }}
                       onDragOver={e => {
                           e.preventDefault()
                           e.stopPropagation()
                       }}
                       onDrop={e => {
                           e.preventDefault()
                           e.stopPropagation()
                           encodeFileToBase64AndSetState(e.dataTransfer.files[0])
                           dropArea.current.classList.remove('dnd-area__active');
                       }}>
                    <input type="file"
                           onChange={e => handleChange(e, setFieldValue)}
                           hidden
                           accept="image/*"
                           ref={inputBonusImage}
                    />
                </label>
            </div>
        )
    }

    function handleChange(e) {
        if (e.target?.files[0]?.size <= MAX_FILE_SIZE_IN_MB * 1_000_000) encodeFileToBase64AndSetState(e.target?.files[0])
    }

    function encodeFileToBase64AndSetState(file) {
        const fr = new FileReader();
        fr.readAsDataURL(file)
        fr.onloadend = e => {
            setBase64Image(fr.result)
        }
        fr.onerror = console.error
    }
}

const Bonus = ({name, description, money, image}) => {
    return (
        <Card className="p-3 m-2" style={{width: 300}}>
            <h1>{name}</h1>
            <img src={image} alt=""/>
            <p style={{textAlign: 'start'}}>{description}</p>
            <strong>{money}у.е.</strong>
            <Button>Support project</Button>
        </Card>
    );
};


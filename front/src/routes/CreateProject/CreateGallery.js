import React from 'react';
import Gallery from "../DetailedProject/Gallery";

const MAX_FILE_SIZE_IN_MB = 5

const CreateGallery = ({images, setFieldValue}) => {
    const fileInputRef = React.createRef()
    const fileInputDropArea = React.createRef()
    return (
        <React.Fragment>
            <div className="d-flex flex-wrap">
                <div>
                    <div>
                        <strong>Drop images here or click</strong><br/>
                        Supported formats: png, jpg.<br/>
                        Max file size {MAX_FILE_SIZE_IN_MB}mb<br/>
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
                               fileInputDropArea.current.classList.remove('dnd-area__active');
                           }}>
                        <input type="file"
                               onChange={handleChange}
                               hidden
                               accept="image/*"
                               ref={fileInputRef}
                        />
                    </label>
                </div>
                <div className="ml-lg-3 mt-3">
                    <h1>Preview</h1>
                    <Gallery images={images}/>
                </div>
            </div>
        </React.Fragment>
    )

    function handleChange(e) {
        encodeImageToBase64(e.target.files[0])
            .then(base64Image => setFieldValue('images', [...images, base64Image]));
    }

    function encodeImageToBase64(image) {
        if(image.size > MAX_FILE_SIZE_IN_MB * 1_000_000) return;
        return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.readAsDataURL(image);
            fr.onloadend = () => resolve(fr.result);
            fr.onerror = () => reject('Something went wrong encoding file to base64');
        })
    }
};


export default CreateGallery;

import React from "react";
import ImageUploading from "react-images-uploading";
import {Button} from "react-bootstrap";


function ImageUploader({setImages, images}) {
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        window.images = (imageList);
        setImages(imageList);
    };

    return (
        <div className="App">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps
                  }) => (
                    <div className="upload__image-wrapper">
                        <div className="d-flex justify-content-start mb-2 mt-2">
                            <Button
                                style={isDragging ? {color: "red"} : null}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Click or Drop here
                            </Button>
                            &nbsp;
                            <Button onClick={onImageRemoveAll}>Remove all images</Button>
                        </div>
                        <div className="d-flex justify-content-start align-items-end">
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item d-inline-block">
                                    <img src={image.data_url} alt="" width="100"/>
                                    <div className="image-item__btn-wrapper p-2 d-flex justify-content-between">
                                        <Button onClick={() => onImageUpdate(index)}>Update</Button>
                                        <Button onClick={() => onImageRemove(index)}>Remove</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}

export default ImageUploader;

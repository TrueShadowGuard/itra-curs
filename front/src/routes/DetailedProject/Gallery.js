import React from 'react';
import {Carousel} from "react-bootstrap";

const carouselStyle = {
    width: '100%',
    maxWidth: '500px'
}
export default function Gallery() {
    return (
        <Carousel style={carouselStyle} indicators={true}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg"
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg"
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    );
};

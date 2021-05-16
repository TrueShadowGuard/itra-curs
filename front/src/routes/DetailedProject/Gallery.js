import React from 'react';
import {Carousel} from "react-bootstrap";

const carouselStyle = {
    overflow: 'hidden'
}
export default function Gallery({images}) {
    return <Carousel fade style={{maxWidth: 400}}>
        {images?.map(image => (
            <Carousel.Item>
                <img
                    className="d-block"
                    src={image}
                    height={300}
                    alt=''
                />
            </Carousel.Item>
        ))
        }
    </Carousel>
}

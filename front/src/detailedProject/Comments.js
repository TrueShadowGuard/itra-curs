import React from 'react'
import {Button, FormControl} from "react-bootstrap";

const comment = {
    author: 'Vadim',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqu',
    likedBy: [1, 2, 3, 4],
    imgUrl: 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-with-glasses.jpg'
}

const comments = [
    comment, comment, comment, comment,
]


function Comment({comment}) {
    return <div>
        <img width="40px" style={{borderRadius: '50%', float: 'left'}} src={comment.imgUrl} alt/>
        <h1>{comment.author}</h1>
        <p>{comment.text}</p>
    </div>
}

function SendMessage() {
    return <div className="d-flex">
        <Button variant="outline-primary">Send</Button>
        <FormControl type="text" placeholder="message" className="ml-2"/>
    </div>
}

export default function Comments() {
    return <div>
        {comments.map(comment => <Comment comment={comment}/>)}
        <SendMessage/>
    </div>
}




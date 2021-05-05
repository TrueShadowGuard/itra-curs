import React, {useContext, useEffect, useState} from 'react'
import {Button, FormControl} from "react-bootstrap";
import sendComment from "../../http/sendComment";
import getComments from "../../http/getComments";
import {NavLink} from "react-router-dom";

const comment = {
    author: 'Vadim',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqu',
    likedBy: [1, 2, 3, 4],
    imgUrl: 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-with-glasses.jpg'
}


function Comment({comment}) {
    return <div>
        <img width="40px" style={{borderRadius: '50%', float: 'left'}} src={comment.imgUrl} alt/>
        <NavLink to={`/profiles/${comment.userId}`}>{comment.userName}</NavLink>
        <p>{comment.message}</p>
    </div>
}

function SendMessage({id}) {
    const [value, setValue] = useState('')
    return <div className="d-flex">
        <Button variant="outline-primary" onClick={() => sendComment(id, value)}>Send</Button>
        <FormControl value={value} onChange={e => setValue(e.target.value)} type="text" placeholder="message"
                     className="ml-2"/>
    </div>
}

export default function Comments(id, startComments) {
    console.log('startComments', startComments)
    const [comments, setComments] = useState(startComments);

    useEffect(function updateComments() {
        try {
            getComments(id)
                .then((response) => response.json())
                .then(comments => {
                    console.log('new comments', comments)
                    setComments(comments)
                    setTimeout(500, () => updateComments())
                })
        } catch (e) {
            console.log(e)
            setTimeout(500, () => updateComments())
        }
    }, [])
    return <div>
        {comments?.map(comment => <Comment comment={comment}/>)}
        <SendMessage id={id}/>
    </div>
}


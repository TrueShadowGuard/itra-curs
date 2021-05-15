import React, {useContext, useEffect, useState} from 'react'
import {Button, FormControl} from "react-bootstrap";
import sendComment from "../../http/sendComment";
import getComments from "../../http/getComments";
import {NavLink} from "react-router-dom";

function Comment({comment}) {
    return <div>
        <img width="40px" style={{borderRadius: '50%', float: 'left'}} src={comment.imgUrl} alt/>
        <NavLink to={`/profiles/${comment.userId}`}>{comment.userName}</NavLink>
        <p>{comment.message}</p>
    </div>
}

function SendMessage({id}) {
    const [value, setValue] = useState('')
    const [fetching, setFetching] = useState(false)
    return <div className="d-flex">
        <Button variant="outline-primary"
                onClick={async () => {
                    if (!value) return
                    setFetching(true)
                    await sendComment(id, value)
                    setValue('')
                    setFetching(false)
                }}
                disabled={fetching}
        >
            Send
        </Button>
        <FormControl value={value} onChange={e => setValue(e.target.value)} type="text" placeholder="message"
                     className="ml-2"/>
    </div>
}

export default function Comments({id, initialComments}) {

    const [comments, setComments] = useState(initialComments);

    useEffect(() => {
        const interval = setInterval(() => {
            updateComments()
        },2000)
    }, [])

    return <div className="pb-5">
        {comments?.map(comment => <Comment comment={comment}/>)}
        <SendMessage id={id}/>
    </div>

    function updateComments() {
        console.log('updateComments')
        getComments(id)
            .then(response => response.json())
            .then(comments => {
                setComments(comments)
            })
    }
}


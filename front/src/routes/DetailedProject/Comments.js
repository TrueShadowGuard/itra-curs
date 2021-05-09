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
                    if(!value) return
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

export default function Comments(id, startComments) {
    console.log('startComments', startComments)
    const [comments, setComments] = useState(startComments);

    useEffect(function updateComments() {
        try {
            getComments(id)
                .then((response) => response.json())
                .then(comments => {
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


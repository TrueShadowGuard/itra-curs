import React, {useContext, useState} from 'react'
import {Button, FormControl, FormGroup} from "react-bootstrap";
import {useHistory} from "react-router";
import {Auth} from "../App";
import {createBrowserHistory} from "history";

export default function SearchField() {
    const [value, setValue] = useState('')
    const history = useHistory()

    return (
        <div className="d-flex">
            <Button variant="outline-light"
                    className="mr-2"
            onClick={() => history && history.push(`/search?q=${value}`)}>
                Search
            </Button>
            <FormControl value={value}
                         onChange={e => setValue(e.target.value)}
                         placeholder="Search for project"/>
        </div>
    )
}

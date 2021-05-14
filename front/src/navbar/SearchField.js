import React from 'react'
import {Button, FormControl, FormGroup} from "react-bootstrap";
import {useHistory} from "react-router";


export default function SearchField() {
    const history = useHistory()
    const input = React.createRef()

    return (
        <div className="d-flex">
            <Button variant="outline-light"
                    className="mr-2"
                    onClick={handleSearch}>
                Search
            </Button>
            <FormControl placeholder="Min length: 3" ref={input}/>
        </div>
    )

    function handleSearch(e) {
        const value = input.current.value
        if(value.length < 3) return
        history.push(`/?q=${value}&page=0&count=4`)
    }
}

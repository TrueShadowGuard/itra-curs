import React from 'react'
import {Button, FormControl, FormGroup} from "react-bootstrap";

export default function SearchField() {
    return (
        <div className="d-flex">
            <FormGroup>
                <Button variant="outline-light" className="mr-2">
                    Search
                </Button>
                <FormControl placeholder="Search for project"></FormControl>
            </FormGroup>
        </div>
    )
}

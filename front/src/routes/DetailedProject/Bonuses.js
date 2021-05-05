import {Button, Card} from "react-bootstrap";
import React from "react";

export default function Bonuses({bonuses}) {
    return <div>
        {bonuses?.map(({title, money, img, description}) => <Card className="p-3 mt-2">
            <h5>{title}</h5>
            {img && <img src={img} alt=""/>}
            <p style={{textAlign: 'start'}}>{description}</p>
            <strong>{money}у.е.</strong>
            <Button>Support project</Button>
        </Card>)}
    </div>
}

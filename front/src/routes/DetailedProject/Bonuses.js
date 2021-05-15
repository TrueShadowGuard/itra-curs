import {Button, Card} from "react-bootstrap";
import React, {useState} from "react";

export default function Bonuses({bonuses, sendMoney}) {
    const [fetching, setFetching] = useState(false)
    return <div>
        {bonuses?.map(({name, money, image, description, _id}) => {
            return (
                <Card className="p-3 mt-2" style={{width: '100%'}}>
                    <h1 style={{fontSize: '2rem'}}>{name}</h1>
                    {image && <img src={image} alt=""/>}
                    <p style={{textAlign: 'start'}}>{description}</p>
                    <strong>{money}у.е.</strong>
                    <Button disabled={fetching}
                            onClick={() => {
                                setFetching(true)
                                sendMoney(money, _id).finally(setFetching.bind(null, false))
                            }}>Support project</Button>
                </Card>
            )
        })}
    </div>
}

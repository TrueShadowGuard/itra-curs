import {ProgressBar} from "react-bootstrap";
import React from "react";

export default function MoneyInicator({money, totalMoney}) {
    const percent = Math.floor(money / totalMoney * 100);
    return (
        <>
            <div>
                <span style={{fontSize: '3rem'}}>{money}$</span><br/>
                <div className="d-flex justify-content-between">
                    <span>of {totalMoney}$</span>
                    <span>Collected {percent}%</span>
                </div>
            </div>
            <ProgressBar animated now={percent}/>
            <hr/>
        </>
    );
}

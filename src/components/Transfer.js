import React from "react";

export default function Transfer(props) {

    return(
        <div className="item-list" style={props.style}>
            <div className="name-amount">
                <h2 className="amount-tranfer">- ${props.amount}</h2>
                <h2>{props.name}</h2>
            </div>
            <p>{props.iban}</p>
        </div>
        
        
    )
}
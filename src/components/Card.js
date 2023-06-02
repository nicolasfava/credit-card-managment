import React from "react"
import logo from "../images/mastercardLogo.png"
import flipIcon from "../images/flipIcon.png"
import eyeIcon from "../images/eyeIcon.png"

export default function Card(props) {

    console.log(props)
    return(
        <div className="card-wrap">
            <div className="card-data">
                {props.isFront ? 
                <div className="frontCard">
                    <p className="card-name">{props.firstName} {props.lastName}</p>
                    <img src={logo} className="card-logo"/>
                </div>
                :
                <div className="backCard">
                    <p className="card-number">{props.number}</p>
                    <p className="card-expired">{props.month} {props.year}</p>
                    <p className="card-cvv">{props.cvv}</p>
                    <div className="card-blackBand"></div>
                </div>
                }
                
            </div>
            <img src={flipIcon} className="card-flip" onClick={props.onClick}/>
            <div className="card-cash">
                <p>Balance</p>
                <h2 className="cash" style={props.style}>${props.balance}</h2>
            </div>
            <img src={eyeIcon} className="card-eye" onClick={props.privacy}/>
        </div>
           
    )
}
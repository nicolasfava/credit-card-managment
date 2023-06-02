import React from "react"
import Card from "./components/Card"
import cash from "./cash"
import Transfer from "./components/Transfer"
import {nanoid} from "nanoid"


export default function App() {
  const [cardData, setCardData] = React.useState(
    JSON.parse(localStorage.getItem("cardData")) || {})

  React.useEffect(() => {
    localStorage.setItem("cardData", JSON.stringify(cardData))
  }, [cardData])
  

  const [balance, setBalance] = React.useState(
    JSON.parse(localStorage.getItem("balance")) || cash.balance)

  React.useEffect(() => {
    localStorage.setItem("balance", JSON.stringify(balance))
  }, [balance])

  const [transfers, setTranfers] = React.useState(
    JSON.parse(localStorage.getItem("tranfers")) || [])

  React.useEffect(() => {
    localStorage.setItem("tranfers", JSON.stringify(transfers))
  }, [transfers])

  const [isUser, setIsUser] = React.useState(
    JSON.parse(localStorage.getItem("isUser")) || false)

  React.useEffect(() => {
    localStorage.setItem("isUser", JSON.stringify(isUser))
  }, [isUser])

  const [isDark, setIsDark] = React.useState(
    JSON.parse(localStorage.getItem("isDark")) || false)

  React.useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark))
  }, [isDark])

  const [isPrivacy, setIsPrivacy] = React.useState(
    JSON.parse(localStorage.getItem("isPrivacy")) || false)

  React.useEffect(() => {
    localStorage.setItem("isPrivacy", JSON.stringify(isPrivacy))
  }, [isPrivacy])



  function handleChangeCard(event) {
    const {name, value} = event.target
    setCardData(oldCardData => {
      return {
        ...oldCardData,
        [name]: value
      }
    })
    
  }

  function sendData(event) {
    event.preventDefault()
    setCardData(() => {
      return{
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        cardNumber: event.target.cardNumber.value,
        month: event.target.month.value,
        year: event.target.year.value,
        cvv: event.target.cvv.value,
        isFront: true
      }
    })
    setIsUser(true)
    
    console.log(cardData)
  }

  function flipCard() {
    setCardData(oldCardData => {
      return{
        ...oldCardData,
        isFront: !cardData.isFront
      }
    })
  }

  function tranferGenerator(event) {
    event.preventDefault()
    setTranfers(oldTranfer => [...oldTranfer, {
      id: nanoid(),
      name: event.target.name.value,
      amount: event.target.amount.value,
      iban: event.target.iban.value
    }])
    setBalance(balance => balance - event.target.amount.value)
    console.log(event.target.name.value)
  }

  function privacy() {
    setIsPrivacy(isPrivacy => !isPrivacy)
    console.log(isPrivacy)
  }

  function setMode() {
    setIsDark(isDark => !isDark)
    console.log(isDark)
  }

  const stylesBalance = {
    display: isPrivacy ? "none" : "block"
  }

  const stylesOnOff = {
    left: isDark ? "20px" : "0px"
  }

  const stylesMain = {
    backgroundColor: isDark ? "#525252" : "#ffffff"
  }

  const stylesForms = {
    border: isDark ? "1px solid #ffffff" : "1px solid #525252",
    color: isDark ? "#ffffff" : "#525252"
  }

  const stylesMode = {
    color: isDark ? "#ffffff" : "#525252"
  }



  const tranferElement = transfers.map(transfer => <Transfer key={transfer.id} name={transfer.name} amount={transfer.amount} iban={transfer.iban} style={stylesForms}/>)


  return(
    isUser ? 
    <main className="card-managment" style={stylesMain}>
      <div className="mode" style={stylesMode}>
        <p>light</p>
        <div className="toggle" onClick={setMode}>
          <div className="on-off" style={stylesOnOff}></div>
        </div>
        <p>dark</p>
      </div>
      <Card firstName={cardData.firstName} lastName={cardData.lastName} number={cardData.cardNumber} month={cardData.month} year={cardData.year} cvv={cardData.cvv} isFront={cardData.isFront} balance={balance} onClick={flipCard} privacy={privacy} style={stylesBalance}/>
      <div className="tranfer-wrap">
        <form className="tranfer" onSubmit={tranferGenerator} style={stylesForms}>
          <label>Make a tranfer</label>
          <div className="nameTranfer">
            <input type="text" placeholder="Name" name="name"/>
            <input type="text" placeholder="Tranfer Amount" name="amount"/>
          </div>
          <input type="text" placeholder="IBAN" className="ibanTranfer" name="iban"/>
          <button className="btnTranfer">Send</button>
        </form>
        <div className="tranfers-list">
          {tranferElement}
        </div>
      </div>
    </main>
    :
    <div>
      <form className="dataCard" onSubmit={sendData}>
        <h1>Welcome in your professional card managment</h1>
        <div className="dataCard-name">
          <input type="text" placeholder="First name"name="firstName" onChange={handleChangeCard}/>
          <input type="text" placeholder="Last name"name="lastName" onChange={handleChangeCard}/>
        </div>
        <input className="dataCard-number" type="text" placeholder="XXXX-XXXX-XXXX-XXXX" name="cardNumber" onChange={handleChangeCard}/>
        <div className="dataCard-expired-cvv">
          <input type="text" placeholder="MM" name="month" onChange={handleChangeCard}/>
          <input type="text" placeholder="YYYY" name="year" onChange={handleChangeCard}/>
          <input type="text" placeholder="CVV" name="cvv" onChange={handleChangeCard}/>
        </div>
        <button className="dataCard-btn">Start</button>
      </form>
    </div>
    
    
  )
}

import React from 'react'
import { Link } from 'react-router-dom'


const Card = ({id, reference, amount, currency, description, transaction_timestamp, counterparty}) => {



  return (
    <div className="card">
      <div className="cardinfo">
        <h4 className="content text reference" >{reference}</h4>
        <h4 className="content text counterparty">{counterparty}</h4>
        <h4 className="content text description">{description}</h4>
        <h4 className="content text timestamp">{transaction_timestamp}</h4>
        <h4 className="content text amount">{amount} {currency}</h4>
      </div>
      <div className="buttonsdiv">
        <Link to ={`/dashboard/${id}`}><a className="button is-warning homebutton tooltip" data-tooltip="Edit transaction">Edit</a></Link>
      </div>
    </div>
  )
}

export default Card

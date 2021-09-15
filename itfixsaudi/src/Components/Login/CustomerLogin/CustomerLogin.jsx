import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

export default function CustomerLogin() {
    const [customer, setCustomer] = useState();
    const [toNext, setToNext] = useState(false)

    const changeCustomerHandler = ({target}) => setCustomer({...customer , [target.name] : target.value})
    
    const customerOnSubmitHandler = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:4000/api/v1/customer/login',customer)
        .then(data => {
            console.log(data)
            setToNext(true)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <h1>Customer login</h1>

            <form onSubmit={(e) => customerOnSubmitHandler(e)}>

                <label>email: </label>
                <input type="text" name="email" onChange = {(e) => changeCustomerHandler(e)}></input>

                <label>Password: </label>
                <input type="Password" name="password" onChange = {(e) => changeCustomerHandler(e)}></input>

                <button type="submit">Submit</button>
                {toNext ? <Redirect to="/" />: null}

            </form>
        </div>
    )
}

import React, { useState } from 'react'
import axios from 'axios'
import { Redirect, useHistory } from 'react-router'
import Alert from "@material-ui/lab/Alert"

export default function CustomerRegister() {

    const [customer, setCustomer] = useState({})
    const [toNext, setToNext] = useState(false)
    const [flag, setFlag] = useState(false)
    const [sucess, setSucess] = useState(false)
    const [message, setMessage] = useState("")
    const history = useHistory()

    const customerChangeHandler = (e) => {
        let name = e.target.name
        let value = e.target.value
        setCustomer({ ...customer, [name]: value })

    }

    const customerOnSubmitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/api/v1/customer/register', customer)
            .then(data => {
                console.log(data)
                setToNext(true)
                setFlag(true)
                setMessage(data.data.message)
                setSucess(true)
                setTimeout(() => history.push('/'), 1000)
            }).catch(err => {
                setFlag(true)
                setSucess(false)
                setMessage(err.response.data.message)
                console.log(err.response.data.message)
            })
    }

    return (
        <div>
            {flag && (sucess ?
                <Alert severity="success">{message}</Alert>
                :
                <Alert severity="error">{message}</Alert>)
            }

            <h1>customer register</h1>
            <form onSubmit={(e) => customerOnSubmitHandler(e)}>

                <label>First Name: </label>
                <input type="text" name="firstName" onChange={(e) => customerChangeHandler(e)}></input>

                <label>Last Name: </label>
                <input type="text" name="lastName" onChange={(e) => customerChangeHandler(e)}></input>

                <label>username: </label>
                <input type="text" name="username" onChange={(e) => customerChangeHandler(e)}></input>

                <label>email: </label>
                <input type="text" name="email" onChange={(e) => customerChangeHandler(e)}></input>

                <label>Password: </label>
                <input type="Password" name="password" onChange={(e) => customerChangeHandler(e)}></input>

                <button type="submit">Submit</button>

                {/* {toNext ? <Redirect to="/" /> : null} */}
            </form>


        </div>
    )
}

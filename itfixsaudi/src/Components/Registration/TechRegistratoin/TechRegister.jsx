import React, { useState } from 'react'
import axios from 'axios'
import { Redirect, useHistory } from 'react-router'
import Alert from "@material-ui/lab/Alert"

export default function TechRegister() {

    const [tech, setTech] = useState({})
    const [toNext, setToNext] = useState(false)
    const [flag, setFlag] = useState(false)
    const [sucess, setSucess] = useState(false)
    const [message, setMessage] = useState("")
    const history = useHistory()

    const techChangeHandler = (e) => {
        let name = e.target.name
        let value = e.target.value
        setTech({ ...tech, [name]: value })
    }

    const techOnSubmitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/api/v1/technician/register', tech)
            .then(data => {
                console.log(data)
                setToNext(true)
                setFlag(true)
                setMessage(data.data.message)
                setSucess(true)
                setTimeout(() => history.push('/'), 2000)
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
            <h1>Technician register</h1>
            <form onSubmit={(e) => techOnSubmitHandler(e)}>

                <label>First Name: </label>
                <input type="text" name="firstName" onChange={(e) => techChangeHandler(e)}></input>

                <label>Last Name: </label>
                <input type="text" name="lastName" onChange={(e) => techChangeHandler(e)}></input>

                <label>username: </label>
                <input type="text" name="username" onChange={(e) => techChangeHandler(e)}></input>

                <label>email: </label>
                <input type="text" name="email" onChange={(e) => techChangeHandler(e)}></input>

                <label>Password: </label>
                <input type="Password" name="password" onChange={(e) => techChangeHandler(e)}></input>

                <label>iban: </label>
                <input type="text" name="iban" onChange={(e) => techChangeHandler(e)}></input>

                <label>Device type: </label>
                <select name="deviceType" onChange={(e) => techChangeHandler(e)}>
                    <option>Choose a device</option>
                    <option value="phone">phone</option>
                    <option value="computer">computer</option>
                </select>

                <label>Software type: </label>
                <select name="softwareType" onChange={(e) => techChangeHandler(e)}>
                    <option>Choose a software</option>
                    <option value="IOS">IOS</option>
                    <option value="Android">Android</option>
                </select>

                <button type="submit">Submit</button>

                {toNext ? <Redirect to="/" /> : null}
            </form>

        </div>
    )
}

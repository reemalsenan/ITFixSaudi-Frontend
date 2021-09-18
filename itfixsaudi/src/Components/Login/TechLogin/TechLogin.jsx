import React, { useState } from 'react'
import axios from 'axios'
import { Redirect, useHistory } from 'react-router'
import Alert from "@material-ui/lab/Alert"

export default function TechLogin(props) {

    const [tech, setTech] = useState()
    // const [toNext, setToNext] = useState(false)
    const [flag, setFlag] = useState(false)
    const [sucess, setSucess] = useState(false)
    const [message, setMessage] = useState("")
    const history = useHistory()

    const changeTechHandler = ({ target }) => setTech({ ...tech, [target.name]: target.value })

    const techOnSubmitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/api/v1/technician/login', tech)
            .then(data => {
                console.log(data)
                // setToNext(true)
                localStorage.setItem("token", data.data.token)
                props.loginFucntion()
                setMessage(data.data.message)
                setSucess(true)
                setTimeout(() => history.push('/'), 1000)
            }).catch(err => {
                console.log(err)
                setFlag(true)
                setSucess(false)
                setMessage(err.response.data.message)
            })
    }

    return (
        <div>
            {flag && (sucess ?
                <Alert severity="success">{message}</Alert>
                :
                <Alert severity="error">{message}</Alert>)
            }
            <h1>Tech login</h1>

            <form onSubmit={(e) => techOnSubmitHandler(e)}>

                <label>email: </label>
                <input type="text" name="email" onChange={(e) => changeTechHandler(e)}></input>

                <label>Password: </label>
                <input type="Password" name="password" onChange={(e) => changeTechHandler(e)}></input>

                <button type="submit">Submit</button>
                {/* {toNext ? <Redirect to="/" /> : null} */}

            </form>
        </div>
    )
}

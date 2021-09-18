import React, { useState } from 'react'
import axios from 'axios'
import { Redirect, useHistory } from 'react-router'

export default function TechLogin(props) {

    const [tech, setTech] = useState()
    // const [toNext, setToNext] = useState(false)
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
                history.push("/")
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
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

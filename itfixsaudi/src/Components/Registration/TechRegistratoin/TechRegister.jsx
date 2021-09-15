import React, {useState} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
export default function TechRegister() {

    const [tech, setTech] = useState({})
    const [toNext, setToNext] = useState(false)

    const techChangeHandler = (e) => {
        let name = e.target.name 
        let value = e.target.value
        setTech({...tech, [name]: value})
    }

    const techOnSubmitHandler = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:4000/api/v1/technician/register',tech)
        .then(data => {
            console.log(data)
            setToNext(true)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <h1>Technician register</h1>
            <form onSubmit={(e) => techOnSubmitHandler(e)}>

                <label>First Name: </label>
                <input type="text" name="firstName" onChange={(e)=>techChangeHandler(e)}></input>

                <label>Last Name: </label>
                <input type="text" name="lastName" onChange={(e)=>techChangeHandler(e)}></input>

                <label>username: </label>
                <input type="text" name="username" onChange={(e)=>techChangeHandler(e)}></input>

                <label>email: </label>
                <input type="text" name="email" onChange={(e)=>techChangeHandler(e)}></input>

                <label>Password: </label>
                <input type="Password" name="password" onChange={(e)=>techChangeHandler(e)}></input>

                <label>iban: </label>
                <input type="text" name="iban" onChange={(e)=>techChangeHandler(e)}></input>

                <label>Device type: </label>
                <select name="deviceType">
                <option value="phone">phone</option>
                <option value="computer">computer</option>
                </select>

                <label>Software type: </label>
                <select name="softwareType">
                <option value="IOS">IOS</option>
                <option value="Android">Android</option>
                </select>

                <button type="submit">Submit</button>

                {toNext ? <Redirect to="/" />: null}
            </form>
            
        </div>
    )
}

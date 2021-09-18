import React from 'react'
import {useHistory} from "react-router-dom"


export default function Navbar(props) {
    const history = useHistory()

    const logOut = () => {
        localStorage.removeItem("token")
        props.loginFunction()
        history.push("/")
    }

    return (
        <>
        <div>
            
            {!props.isLogin ?
            <>
             <a href="/login">Log In</a>
             <a href="/register"> Get Started</a>
             </>
             :
             <>
             <a href="">Profile {props.user.firstName}</a>
             <a onClick={()=> logOut()} href="" type="button"> Logout</a>
            </>
            }
            
           
        </div>
       </>
    )
}

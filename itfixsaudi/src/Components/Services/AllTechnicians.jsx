import axios from 'axios'
import React , { useState, useEffect } from 'react'

export default function AllTechnicians() {

    const [tech, setTech] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/api/v1/technician/allTech', tech)
        .then(data => {
            setTech(data.data.allTech)
        }).catch(err => console.log(err))
    },[])

    const techInfo = tech.map(ele => <h4>{ele.firstName}</h4>)

    return (
        <div>
            <h2>All Technicians</h2>
            {techInfo}
        </div>
    )
}

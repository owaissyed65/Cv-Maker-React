import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()
    // eslint-disable-next-line
    const logoutPage =async () =>{ 
        // eslint-disable-next-line
        const res = await fetch('http://localhost:5000/auth/logout') 

        
    }
    useEffect(() => {
        fetch('/auth/logout', {
            // eslint-disable-next-line
            method: 'GET',
            headers: {
                // Accept: 'appllication/json',
                "Content-Type": "application/json",
            },
            // credentials: 'include'
        }).then((res) => {
            navigate('/login')
            if (res.status !== 200) {
                const error = new Error(res.error)
                throw error;
            }
        }).catch((error)=>{
            console.log(error);
        })
        // eslint-disable-next-line
    }, []);
    return (
        <></>
    )
}

export default Logout

import React, { useState, useEffect } from 'react'

const Home = () => {
    const [info, setInfo] = useState({ name: '', work: '' });
    const Aboutme = async () => {
        try {

            let res = await fetch('/auth/about', {
                method: 'GET',
                headers: {
                    Accept: 'appllication/json',
                    "Content-Type": "application/json",
                },
                credentials: 'include'
            })
            const data = await res.json()
            console.log(data.user.name)
            const { user } = data;
            setInfo({ name: user.name, work: user.work })
            if (res.status===401)
            console.log(data)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        Aboutme()
    }, []);

    return (
        <div className='containers'>
            <div className='Homepage'>
                <p className='wel'>Welcome {info.name}</p>
                <h1 className='home'>We are the Mern Developer</h1>

            </div>
        </div>
    )
}

export default Home

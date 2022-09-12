import React from 'react'

const ContactInform = (props) => {
    const { name, message, date ,id} = props
    const deltNote = async () => {
        console.log('helllo')
        let res = await fetch(`/auth/dlt/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json",
            },
        });
        let data = await res.json();
        console.log(data)
    }
    return (
        <>
            <div className='container mt-0 mb-2' style={{ borderBottom: '2px solid gray' }}>
                {name} : {message} : {date}   :{id}  &nbsp;
                <button className='btn btn-primary' onClick={deltNote}>Delete</button>
            </div>
        </>
    )
}

export default ContactInform

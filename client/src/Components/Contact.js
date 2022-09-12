import React, { useState, useEffect } from 'react'
import ContactInform from './ContactInform'
const Contact = () => {
  const [info, setInfo] = useState({ name: '', email: '', phone: '', message: '' })

  const [value, setValue] = useState([]);
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
      const { user } = data;
      const { messages } = user
      setValue([...messages])
      setInfo({ name: user.name, email: user.email, phone: user.phone })
      if (res.status === 401) {

      }
    } catch (error) {
      console.log(error)
    }


  }
  useEffect(() => {
    Aboutme()
    // eslint-disable-next-line
  }, []);
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }
  const postMsg = async (e) => {
    e.preventDefault()
    const { name, email, message, phone } = info
    let res = await fetch('/auth/contact', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, phone: phone, email: email, message: message, })
    })
    await res.json()
    setValue(value.concat(info))
    console.log(value)
    if (res.status === 201) {
      window.alert("Message send Successfully")

    }
  }
  return (
    <div style={{ height: '100%', width: "100%" }}>
      <div className='d-flex justify-content-center my-5'>
        <div className="shadow p-3 mb-5 bg-body rounded  ">
          <div className="row g-3">
            <h1 className='pb-3'>Your Details</h1>
            <div className="col my-3">
              <input type="text" className="form-control w-auto p-2" placeholder="Name" aria-label="First name" defaultValue={info.name} />
            </div>
            <div className="col my-3">
              <input type="email" className="form-control w-auto p-2" placeholder="Email" aria-label="email" defaultValue={info.email} />
            </div>
            <div className="col my-3">
              <input type="text" className="form-control w-auto p-2" placeholder="Number" aria-label="First name" defaultValue={info.phone} />
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-center align-items-center mb-5' style={{ height: '100vh' }}  >
        <div className="shadow pos p-3 mb-5 bg-body rounded">
          <h1 className='pb-3'>Get In Touch</h1>
          <div className="row g-3">
            <div className="col my-3">
              <input type="text" className="form-control w-auto p-2" placeholder="Name" aria-label="name" value={info.name} onChange={handleChange} name='name' id='name' />
            </div>
            <div className="col my-3">
              <input type="email" className="form-control w-auto p-2" placeholder="Email" aria-label="email" value={info.email} onChange={handleChange} name='email' id='email' />
            </div>
            <div className="col my-3">
              <input type="number" className="form-control w-auto p-2" placeholder="Phone" aria-label="phone" value={info.phone} onChange={handleChange} name='phone' id='phone' />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea className="form-control" id="message" name='message' rows="5" value={info.message} onChange={handleChange}></textarea>
          </div>
          <button className="btn btn-primary" type="submit" onClick={postMsg}>Send Message</button>
        </div>
      </div>
      <div className='d-flex flex-column justify-content-center container w-50 max' style={{ border: '2px solid black' }}>
        <div className='mx-5 top-0  '>
          <h2>Your messages</h2>

          {value.map((content, index) => { return <div key={index} ><ContactInform name={content.name} message={content.message} date={content.date} id={content._id}/> </div> })}
        </div>
      </div>
    </div>
  )
}

export default Contact

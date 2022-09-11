import React, { useState, useEffect } from 'react'


const Contact = () => {
  const [info, setInfo] = useState({ name: '', email: '', phone: '', msg: '' })
  const [message, setMessage] = useState([]);
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
      console.log(data.user)
      const { user } = data;
      setInfo({ name: user.name, email: user.email, phone: user.phone })
      if (res.status === 401)
        console.log(data)
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
    const { name, email, msg, phone } = info
    let res = await fetch('/auth/contact', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, phone: phone, email: email, msg: msg, })
    })
    const data = await res.json()
    setMessage({ msg: { message: data.msg } })
    // console.log(res)
    // console.log(data)
    console.log(message)
    if (res.status === 201) {
      // window.alert(msg+" Message send Successfully")
      setInfo({ name: '', email: '', msg: '', phone: '' })
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
        <div className="shadow p-3 mb-5 bg-body rounded">
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
            <label htmlFor="msg" className="form-label">Message</label>
            <textarea className="form-control" id="msg" name='msg' rows="5" value={info.msg} onChange={handleChange}></textarea>
          </div>
          <button className="btn btn-primary" type="submit" onClick={postMsg}>Send Message</button>
          <h2>Your messages</h2>
          {message.msg.message.message.map((element,index)=>{
            return element.message[index]
          })}
        </div>
      </div>
    </div>
  )
}

export default Contact

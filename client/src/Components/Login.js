import React, { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const loginUser = async (e) => {
    const { email, password } = credentials
    e.preventDefault();
    let res = await fetch('/auth/login', {
      method: 'POST',

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json();
    console.log(res)
    console.log(data)
    if (res.status === 422 || res.status === 500) {
      window.alert("Please Filled Required Field")
    }
    else if (res.status === 400 || res.status === 500) {
      window.alert("Invalid Credentials or User May not Existed")
    }
    else{
      navigate('/')
    }
  }
  return (
    <>
      <div className='container mx-5 mt-5'>
        <h1>Login</h1>
      </div>
      <div className='container mt-3 m-lg-5'>

        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={handleChange} />

          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleChange} />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary" onClick={loginUser}>Submit</button>
        </form>
        <div className='mt-2'>Not Having an Account? <Link to='/signup'>Create an Account</Link> </div>
      </div>
    </>
  )
}

export default Login

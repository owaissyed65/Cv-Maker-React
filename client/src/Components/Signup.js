import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
const Signup = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({name:'',email:'',password:'',cpassword:'',phone:'',work:''});
    const handleChange = (e) =>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const postData = async (e) =>{
        e.preventDefault()
        const {name,email,password,cpassword,phone ,work} = user
        const res = await fetch('http://localhost:5000/auth/signup',{
            method:'POST',
            headers:{
                'Content-Type':' application/json'
            },
            body:JSON.stringify({name,email,password,cpassword,phone ,work})
        })
        const data = await res.json()
        console.log(res)
        console.log(data)

        if (res.status === 402 || res.status===500 ){
            window.alert("User Already Exist or Invalid Credentials")
        }
        else if(res.status===422){
            window.alert("Please Enter Your Information")
        }
        else{
            navigate('/login')
        }
    }
    return (
        <>
            <div className='container mx-5 mt-5'>

                <h1>Signup</h1>
            </div>
            <div className='container mt-5 m-lg-5'>

                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' id="name" aria-describedby="emailHelp" value={user.name} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email"id="email" aria-describedby="emailHelp" value={user.email} onChange={handleChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' id="password" value={user.password} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" name='cpassword' id="cpassword" value={user.cpassword} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input type="number" className="form-control" name='phone' id="phone" aria-describedby="emailHelp"  value={user.phone} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="work" className="form-label">Profession</label>
                        <input type="text" className="form-control" name='work' id="work" minLength={10} aria-describedby="emailHelp" value={user.work} onChange={handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={postData}>Submit</button>
                </form>
            </div>

        </>
    )
}

export default Signup

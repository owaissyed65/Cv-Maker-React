import React, { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
const About = () => {
  const [info, setInfo] = useState({name:'',work:'',phone:''});
  const navigate = useNavigate()
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
      const {user} = data;
      console.log(data)
      console.log(res)
      if(res.status===401){
        navigate('/login')
      }
      else{
        setInfo({name:user.name,work:user.work,phone:user.phone})
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    Aboutme()
    // eslint-disable-next-line 
  }, []);
  
  return (

    <div>
      {info.name}
      {info.work}
    {info.phone}
    </div>
  )
}

export default About

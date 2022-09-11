import React from 'react'
import Navbar from './Components/Navbar'
import { Routes, Route, } from "react-router-dom";
import About from './Components/About';
import Home from './Components/Home';
import Contact from './Components/Contact';
import Login from './Components/Login';
import Signup from './Components/Signup';
// import Logout from './Components/Logout';
const App = () => {
  
  return (
    
    <>
    
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/about" element={<About />}></Route>
        <Route exact path="/contact" element={<Contact />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        {/* <Route exact path="/logout" element={<Logout/>}></Route> */}
    
      </Routes>
    </>
  )
}

export default App

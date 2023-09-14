import React, { useState } from 'react'
import LoginItem from '../components/item/LoginItem'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Login = () => {
  const [logData, setLogData] = useState({
    email: '',
    password: '',
  })


  const handleInputChanges = (e) =>{
    const {name, value} = e.target;
    setLogData({...logData,[name]:value,})
  }


  const handleUserLogin = async () =>{
    try {
      const userLogin = await axios.post('http://localhost:8080/api/session/login', logData);
      //setLogData(userLogin.data.payload._id)
      console.log('Login Successful:', userLogin.data)
    } catch (error) {
      console.error('Erorr Login', error)
    }
  }


  return (
    <>
    <LoginItem
    email={logData.email}
    password={logData.password}
    inputChanges={handleInputChanges}
    />
    <button variant="outline-primary" size='lg' onClick={handleUserLogin}>Login</button>
    <button variant="outline-primary"><Link  to='/Register'>Create your Account</Link></button>
    </>
  )
}

export default Login

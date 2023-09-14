import React, { useState } from 'react'
import RegisterItem from '../components/item/RegisterItem'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  })

  const handleInputChange = (e) =>{
    const {name, value} = e.target;
    setFormData({...formData,[name]:value,})
  }

  const handleUserRegistered = async () =>{
    try {
      const userRegistered = await axios.post('http://localhost:8080/api/session/register',formData);
      setFormData(userRegistered.data.payload._id)
    } catch (error) {
      console.error('Error Register', error);
    }
  }

  return (
    <>
    <RegisterItem
    first_name={formData.first_name}
    last_name={formData.last_name}
    email={formData.email}
    password={formData.password}
    onInputChange={handleInputChange}
    />
    <button variant="outline-primary" size="lg" onClick={handleUserRegistered}><Link aria-current='page' to='/Products'>Register</Link></button>
    <button variant="outline-primary"><Link aria-current="page" to='/Login'>Already have an account</Link></button>
    </>
  )
}

export default Register

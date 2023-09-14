import { useEffect } from "react"
import { useState } from "react"
import UsersitemList from '../components/itemList/UsersitemList'

const UsersContainer = () => {
  
  const [users , setUsers] = useState([])

  useEffect(()=>{
    fetch('http://localhost:8080/api/user')
    .then(resp => resp.json())
    .then(resp => setUsers(resp.payload))
    .catch(error => console.log(error))
  },[])
  console.log(users)
  return (
    <>
      <UsersitemList users={users} />
    </>
  )
}

export default UsersContainer

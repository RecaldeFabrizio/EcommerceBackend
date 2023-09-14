import React from 'react'
import UsersItem from '../item/UsersItem'

const UsersitemList = ({users}) => {
    return (
      <div style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap"
        }}>
          {users.map(user => <UsersItem key={user._id} user={user}/>)}
      </div>
    )
}

export default UsersitemList
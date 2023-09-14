const UsersItem = ({user}) => {
  return (
    <div className="card w-25">
        <div className="card-body">
            <p>first_name:{user.first_name}</p>
            <p>last_name: {user.last_name}</p>
            <p>email: {user.email}</p>
            <p>role: {user.role}</p>
            <p>password: {user.password}</p>
        </div>
    </div>
  )
}

export default UsersItem
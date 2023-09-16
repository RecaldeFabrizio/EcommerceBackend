import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to='/'>Ecommerce</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to='/Products'>Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to='/Users'>Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to='/Payments'>Payment</Link>
              </li>
              <NavDropdown title="Sessions" id="basic-nav-dropdown" data-bs-theme="dark">
              <NavDropdown.Item>
                <Link className="nav-link " aria-current="page" to='/Login'>Login</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link className="nav-link " aria-current="page" to='/Register'>Register</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Logout</NavDropdown.Item>
              </NavDropdown>
            </ul>
          </div>
        </div>
      </nav>
  )
}

export default NavBar
import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthenticationContext } from '../Context API/TokenAuth'


function Header({insideDashboard}) {
  const navigate = useNavigate()
  const {isAuthorised,setIsAuthorised} =useContext(tokenAuthenticationContext)
  const handleLogout = ()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("username")
    setIsAuthorised(false)
    navigate ('/')
  }
  return (
    <div >
      <Navbar className="bg-dark">
        <Container>
          <Navbar.Brand >
         <Link style={{textDecoration:'none'}} className='text-light fw-bolder fs-4' to={'/'}> <i class="fa-solid fa-computer fa-bounce me-2" ></i>
            Project Fair</Link>
          </Navbar.Brand>
          {
            insideDashboard && 
            <div className='ms-auto '>
              <button onClick={handleLogout} className='btn text-light fw-bold'><i class="fa-solid fa-arrow-right-from-bracket fa-beat me-2"></i>LogOut</button>
            </div>
          }
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
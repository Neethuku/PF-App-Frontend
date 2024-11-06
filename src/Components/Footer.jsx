import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div  style={{height:'300px',width:'100%'}} className=' mt-5 bg-dark'>
    <div className=" container w-100 footer-content d-flex justify-content-between pt-4">
        <div style={{width:'400px'}} className="title ">
            <h5  style={{color:'white'}} className='d-flex'><i class="fa-solid fa-computer fa-bounce me-2" style={{height:'45px'}}></i>
            Project Fair</h5>
            <p style={{textAlign:'justify',color:'white'}}>
                Designed and built with all the love in the world by the Bootstrap team with the help of our contributors.
            </p>
            <span style={{color:'white'}}>Code licensed MIT, docs CC BY 3.0.</span>
            <span style={{color:'white'}}>Currently v5.3.2.</span>
        </div>
        <div className="links d-flex flex-column">
            <h5  style={{color:'white'}}>Links</h5>
            <Link to={'/home'} style={{color:'white'}} className='text-decoration-none'  >Home</Link>
            <Link to={'/login'} style={{color:'white'}} className='text-decoration-none' href="" >Login</Link>
            <Link to={'/register'} style={{color:'white'}} className='text-decoration-none' href="" >Register</Link>
        </div>
        <div className="guides d-flex flex-column">
        <h5  style={{color:'white'}}>Guides</h5>
            <a style={{color:'white'}} className='text-decoration-none' href="https://react.dev/" target='_blank' >React</a>
            <a style={{color:'white'}} className='text-decoration-none' href="https://react-bootstrap.github.io/" target='_blank'>React Bootstrap</a>
            <a style={{color:'white'}} className='text-decoration-none' href="https://www.w3schools.com/react/react_router.asp" target='_blank' >React Routing</a>
        </div>
        <div className="contact">
        <h5  style={{color:'white'}}>Contact Us</h5>
        <div className='d-flex'>
            <input placeholder='Enter your Email Id' type="text" className="form-control" />
            <button className='btn btn-info ms-2'><i class="fa-solid fa-arrow-right"></i></button>
        </div>
        <div style={{color:'white'}} className="icons mt-3 d-flex justify-content-between">
         <i style={{fontSize:'20px'}} class="fa-solid fa-envelope fa-2x"></i>
         <i style={{fontSize:'20px'}} class="fa-brands fa-twitter fa-2x"></i>
         <i style={{fontSize:'20px'}}class="fa-brands fa-linkedin fa-2x"></i>
         <i style={{fontSize:'20px'}} class="fa-brands fa-tiktok fa-2x"></i>
         <i style={{fontSize:'20px'}} class="fa-brands fa-facebook fa-2x"></i>
         <i style={{fontSize:'20px'}}class="fa-brands fa-github fa-2x"></i>
        </div>
        </div>
    </div>
    <p  style={{color:'white'}}  className='text-center mt-4'>Copyright &copy; 2023 Media Player.Built with React</p>
    </div>
  )
}

export default Footer
import React, { useEffect, useState } from 'react'
import landingImg from '../assets/images/img2.png'
import { Link, useNavigate } from 'react-router-dom'
import ProjectCard from '../Components/ProjectCard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectAPI } from '../Services/allAPIs';

function Home() {
  const navigate = useNavigate()
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [allProjects,setAllProjects] = useState([])
console.log(allProjects);

  const getHomeProject = async ()=>{ 
    const result = await getHomeProjectAPI()
    if(result.status===200){
      setAllProjects(result.data)
    }else{
      console.log(result);
    }
  }

  useEffect(()=>{
    getHomeProject()
    if(sessionStorage.getItem("token")){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  })

  const handleProjectPage = ()=>{
    if(sessionStorage.getItem("token")){
      navigate('/projects')
    }else{
      toast.warning("Please login to explore our projects")
    }
  }
  return (
    <>
    {/* landing part */}
    <div style={{width:'100%',height:'100vh'}} className=' bg-dark rounded'>
    <div style={{height:'100%'}} className='container' >
      <div style={{height:'100%'}} className='row align-items-center'>
        <div className='col-lg-5'>
          <h1 style={{fontSize:'80px'}} className='fw-bolder  text-light '><i style={{height:'82px'}} className='fa-solid fa-paperclip'></i>Project Fair</h1>
          <p className='text-light'>One stop destination for all software Development projects.where user can add and manage their projects. as well as access all projects available in our website... what are you waiting for!!!</p>
         {isLoggedIn? <Link className='btn btn-warning mt-3' to ={'/dashboard'}>Manage Your Projects<i className='fa-solid fa-arrow-right ms-2'></i></Link>:
         <Link className='btn btn-warning mt-3' to ={'/login'}>Starts to explore <i className='fa-solid fa-arrow-right ms-2'></i></Link>}
        </div>
        <div className='col-lg-2'></div>
        <div className='col-lg-5'>
          <img style={{width:'60%'}} className='img-fluid' src={landingImg} alt="No Image" />
        </div>
      </div>
     </div>
     <div className='projects mt-5'>
      <h1 className='text-center mb-5 text-light '>Explore Our Projects</h1>
      <marquee>
        <div className='d-flex justify-content-between'>
          { allProjects.length>0? allProjects.map((project,index)=>(
            <div key={index} className='me-5'>
            <ProjectCard project={project}/>
          </div>
          )):null}
        </div>
      </marquee>
      <div className='text-center'>
        <button onClick={handleProjectPage} className='btn btn-link text-success'>View More Projects</button>
      </div>
     </div>
    </div>
    <ToastContainer autoClose={2000} theme='colored' />
    </>
  )
}

export default Home
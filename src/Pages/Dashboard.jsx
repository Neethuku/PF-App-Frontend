import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import MyProject from '../Components/MyProject'
import Profile from '../Components/Profile'

function Dashboard() {
  const [username,setUsername] = useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("username")){
      setUsername(sessionStorage.getItem("username"))
    }else{
      setUsername("")
    }
  },[])
  return (
    <>
      <Header insideDashboard/>
      <div style={{marginTop:'60px'}} className="dashboard container">
      <h1 className='fw-bolder'>Welcome <span className='text-warning'>{username}</span> </h1>
      <div className="row">
        <div className="col-lg-8">
          <MyProject/>
        </div>
        <div className="col-lg-4">
          <Profile/>
        </div>
       </div>
      </div> 
    </>
  )
}

export default Dashboard
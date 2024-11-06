import React, { useEffect } from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import uploadProfile from '../assets/images/profile.png'
import { SERVER_URL } from '../Services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProfileAPI } from '../Services/allAPIs';

function Profile() {
  const [open, setOpen] = useState(false);
  const [userData,setUserData] = useState({
    username:"",password:"",email:"",github:"",linkedin:"",ProfileImage:""
  })
  const [existingImage,setExistingImage] = useState("")
  const [preview,setPreview] = useState("")

useEffect(()=>{
  if(sessionStorage.getItem("userDetails")){
    const userDetails = JSON.parse(sessionStorage.getItem("userDetails"))
    setUserData({...userData,username:userDetails.username,password:userDetails.password,email:userDetails.email,github:userDetails.github,linkedin:userDetails.linkedin})
    setExistingImage(userDetails.Profile)
  }
},[open])

useEffect(()=>{
  if(userData.ProfileImage){
    setPreview(URL.createObjectURL(userData.ProfileImage))
  }else{
    setPreview("")
  }
},[userData.ProfileImage])

const handleProfileUpdate = async() =>{
  const {username,password,email,github,linkedin,ProfileImage} = userData
  if(!github || !linkedin){
     toast.info("please fill the form completely")
  }else{
    //proceed to api call
    const reqBody = new FormData()
    reqBody.append("username",username)
    reqBody.append("password",password)
    reqBody.append("email",email)
    reqBody.append("github",github)
    reqBody.append("linkedin",linkedin)
    preview?reqBody.append("ProfileImage",ProfileImage): reqBody.append("ProfileImage",existingImage)

    const token = sessionStorage.getItem("token")
    if(token){

      const reqHeader = {
        "Content-Type":preview?"multipart/form-data":"application/json",
        "Authorization":`Bearer ${token}`
       }
       //api call
      try{
    const result = await updateUserProfileAPI(reqBody,reqHeader)
    if(result.status==200){
     setOpen(!open)
     sessionStorage.setItem("userDetails",JSON.stringify(result.data))
    }else{
      console.log(result);
    }
      }catch(err){
      console.log(err);
      }
    }

  }
}

  return (
    <>
      <div className="d-flex rounded p-2 justify-content-between">
        <h2>Profile</h2>
        <button onClick={() => setOpen(!open)}   aria-controls="example-collapse-text"
        aria-expanded={open} className='btn btn-outline-warning'><i className="fa-solid fa-chevron-down"></i></button>
      </div>
      <Collapse in={open}>
        <div className='row shadow p-5 justify-content-center mt-3' id="example-collapse-text">
         <label className='text-center'>
          <input style={{display:'none'}} type="file" onChange={e=>setUserData({...userData,ProfileImage:e.target.files[0]})} />
         { existingImage == "" ?
         <img className='rounded-circle' width={'200px'} height={'200px'} src={preview?preview:uploadProfile} alt="uploaded image" />
        :
        <img className='rounded-circle' width={'200px'} height={'200px'} src={preview?preview : `${SERVER_URL}/uploads/${existingImage}`} alt="" />
        }
         </label>
         <div className='mt-3'><input placeholder='Enter your GitHub URL' type="text" 
         value={userData.github} onChange={e=>setUserData({...userData,github:e.target.value})} className="form-control" /></div>
         <div  className='mt-3'><input placeholder='Enter your Linkedin URL' type="text" 
         value={userData.linkedin} onChange={e=>setUserData({...userData,linkedin:e.target.value})}className="form-control" /></div>
         <button onClick={handleProfileUpdate} className='mt-3 btn btn-outline-warning bg-warning text-light'>Udate</button>
        </div>
      </Collapse>
      <ToastContainer autoClose={2000} theme='colored' />
    </>
  )
}
 
export default Profile
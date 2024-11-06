import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import uploadProject from '../assets/images/uploadProject.png'
import { SERVER_URL } from '../Services/serverUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectAPI } from '../Services/allAPIs'
import { editProjectResponseContext } from '../Context API/ContextShare'


function EditProject({project}) {
  const {editProjectResponse,setEditProjectResponse} =  useContext(editProjectResponseContext)
  const [projectData,setProjectData] = useState({
   id:project._id, title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectImage:""
  })
  const [preview,setPreview] = useState("")

useEffect(()=>{
  if(projectData.projectImage){
    setPreview(URL.createObjectURL(projectData.projectImage))
  }else{
    setPreview("")
  }
},[projectData.projectImage])

  const [show, setShow] = useState(false);
  const handleClose = () => {
  setShow(false);
  setProjectData({   id:project._id, title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectImage:""
})
setPreview("")
  }
  const handleShow = () => setShow(true);

const handleUpdate = async ()=>{
  const {id,title,languages,overview,github,website,projectImage} = projectData
  if(!title || !languages || !overview || !github|| !website){
    toast.info("Please fill the form completely")
  
}else{
  const reqBody = new FormData()
  reqBody.append("title",title)
  reqBody.append("languages",languages)
  reqBody.append("overview",overview)
  reqBody.append("github",github)
  reqBody.append("website",website)
  preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)
  //api call -reqheader
  const token = sessionStorage.getItem('token')
 if(token){
    const reqHeader = {
      "Content-Type":preview?"multipart/form-data":"application/json",
      "Authorization":`Bearer ${token}`
     }
     //api call
     try{
     const result = await editProjectAPI(id,reqBody,reqHeader)
     if(result.status===200){
      // toast.success(`project "${result.data.title}" updated successfully..`)
      handleClose()
      setEditProjectResponse(result.data)
     }else{
     toast.danger(result.response.data)
     }
    }catch(err){
      console.log(err);
    }
 }
}
}
  return (
    <>
      <button  onClick={handleShow} className='btn'><i className="fa-solid fa-edit"></i></button>
      <Modal size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className="row">
          <div className="col-lg-6">
            <label >
              <input type="file" style={{display:'none'}} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})}/>
              <img style={{height:'250px'}} src={preview?preview:`${SERVER_URL}/uploads/${project.projectImage}`} alt="" />
            </label>
          </div>
          <div className="col-lg-6"> 
            <div className='mb-3'>
              <input type="text" className='form-control' placeholder='Project Title' value={projectData.title} onChange={e=>setProjectData({...projectData,title:e.target.value})}/>
            </div>
            <div className='mb-3'>
              <input type="text" className='form-control' placeholder='Language Used' value={projectData.languages} onChange={e=>setProjectData({...projectData,languages:e.target.value})}/>
            </div>
            <div className='mb-3'>
              <input type="text" className='form-control' placeholder='Project GitHub link' value={projectData.github} onChange={e=>setProjectData({...projectData,github:e.target.value})}/>
            </div>
            <div className='mb-3'>
              <input type="text" className='form-control' placeholder='Website link' value={projectData.website} onChange={e=>setProjectData({...projectData,website:e.target.value})}/>
            </div>
            <div className='mb-3'>
              <input type="text" className='form-control' placeholder='Project overview' value={projectData.overview} onChange={e=>setProjectData({...projectData,overview:e.target.value})}/>
            </div>
          </div>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} theme='colored' />
    </>
  )
}

export default EditProject
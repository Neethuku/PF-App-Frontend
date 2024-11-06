import React, { children, createContext, useEffect } from 'react'
import { useState } from 'react'
export const tokenAuthenticationContext = createContext()

function TokenAuth({children}) {
    const [isAuthorised,setIsAuthorised] = useState(false)
    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            setIsAuthorised(true)
        }else{
            setIsAuthorised(false)
        }
    },[isAuthorised])
  return (
    <>
   <tokenAuthenticationContext.Provider value={{isAuthorised,setIsAuthorised}}>
     {children}
     </tokenAuthenticationContext.Provider>
    </>
  )
}

export default TokenAuth
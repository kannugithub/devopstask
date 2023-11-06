import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate();

    const backToButton = () => {

        navigate("/")
    }
  return (
    <>
        <div className='main-not-found'>
            
           <h1> 404 NotFound</h1>
            <button onClick={backToButton}>Back to Home</button>
            </div>
    </>
  )
}

export default NotFound
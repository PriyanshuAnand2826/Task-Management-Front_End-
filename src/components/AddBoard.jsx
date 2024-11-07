import React, { useRef, useState } from 'react'
import styles from './AddBoard.module.css'
import { AddBoard_ } from '../services/auth'
import { ToastContainer,toast } from 'react-toastify'

export default function AddBoard({closemodal}) {
  const emailRef=useRef(null)
  const [error,seterror] = useState(false)
  const notify =(data)=>{
    toast(data,{
    className:'custom-toast',
    progressClassName:'custom-progress-login',
    style:{color:'white',fontFamily:'Poppins',fontWeight:'bold',textAlign:'center',fontSize:'15px'}
    })
    }
  const handleBoard=async()=>{
    const email=emailRef.current.value
    console.log(email)
    if(!email || email===''){
      seterror(true)
      notify("Filed is required")
    }
    else{
    try {
      const response = await AddBoard_(email)
      console.log(response)
      if(response.status === 404){
        notify("User not found")
      }
      else{
        notify('Added to board Successfully')
        setTimeout(()=>{
          closemodal()
        },2000)
      }
      console.log(response.data.message)
    } catch (error) {
      return error
    }
  }
}

const handleEnterPress=(event)=>{
  if(event.key==="Enter"){
    handleBoard()
  }
}
  return (
    <div className={styles.container}>
      <p style={{fontWeight:'bold'}}>Add people to the board</p>
      <input className={styles.input} ref={emailRef} type="email" placeholder='Enter Email' onKeyPress={handleEnterPress}/>
      {error && <span style={{color:'red',fontSize:'12px',marginTop:'-2%',marginLeft:'2%'}}>Field is required</span>}
      <div className={styles.footer}>
      <button className={styles.btn_left} onClick={closemodal}>Cancel</button>
      <button className={styles.btn_right} onClick={()=>handleBoard()} >Add Board</button>
      <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  )
}

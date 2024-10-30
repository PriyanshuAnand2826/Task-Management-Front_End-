import React, { useState } from 'react'
import styles from './Login.module.css'
import Register_Login from '../components/Register-Login'
import Form from '../components/Form'
import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import { toast } from 'react-toastify';







export default function Login() {
  const navigate=useNavigate()
  const [isShown,setisShown] =useState(false)
  const [error,seterror] =useState({
    name:false,
    email:false,
    password:false,
    confirmPassword:false
  });
  const Eyetoggling =()=>{
    setisShown(!isShown)
  }
  const [formData,setFormdata] =useState({
    email: '',
    password: '',
  })
  const formFields = [
    {
      name:"email",
      type:"email",
      icon:<MdOutlineMail/>,
      placeholder:"Email",
      value:formData.email,
      onchange : (e) =>{
        setFormdata({...formData,email:e.target.value})
      }
    },
    {
      name:"password",
      type:isShown?'text':"password",
      icon:<CiLock/>,
      placeholder:"Password",
      value:formData.password,
      iconEnd:isShown?<FaRegEyeSlash cursor={"pointer"}  onClick={Eyetoggling} style={{marginRight:'0.3rem'}}/>:<FaRegEye  cursor={"pointer"} onClick={Eyetoggling} style={{marginRight:'0.3rem'}}/>,
      onchange : (e) =>{
        setFormdata({...formData,password:e.target.value})
      }
    },
  ]

  const ErrorMessages = {
    email:{
      message:"Email is required",
      isValid:formData?.email?.length>0,
      onError: ()=>{
        seterror((error)=>({...error,email:true}))
      }
    },
    password:{
      message:"Field is required",
      isValid:formData.password.length>0,
      onError: ()=>{
        seterror((error)=>({...error,password:true}))
      }
    },
  
  }
    
   //sending toast 
    const notify =(data)=>{
    toast(data,{
    className:'custom-toast',
    progressClassName:'custom-progress-login',
    style:{color:'white',fontFamily:'Poppins',fontWeight:'bold',textAlign:'center',fontSize:'15px'}
    })
    }


  //onsubmit handler 
  const handleSubmit = async (event) => {
    let isError = false
    event.preventDefault()
    console.log("form submitted");
    console.log(formData)
    console.log(error)
    Object.keys(ErrorMessages).forEach((key)=>{
      if(!ErrorMessages[key].isValid){
        isError=true
        ErrorMessages[key].onError()
      }
    })
    if(!isError){
      const res = await login(formData)
      console.log(res)
      if(res.status ===200){
        const {token}=res.data
        const{name}=res.data
        localStorage.setItem("token",token)
        localStorage.setItem("name",name)
        setTimeout(()=>{
          navigate('/board')
        },2500)
      }
      notify(res.data.message)
    
    }
    else{
      notify("Fields are required")
    }

  }


  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Register_Login/>
      </div>
      <div className={styles.right}>
        <Form formFields={formFields} error={error} ErrorMessages={ErrorMessages} onSubmit={handleSubmit}/>
      </div>
    </div>
  )
}

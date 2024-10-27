import React, { useState } from 'react'
import styles from './Register.module.css'
import Register_Login from '../components/Register-Login'
import {useNavigate} from 'react-router-dom'
import Form from '../components/Form'
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { toast } from 'react-toastify'








export default function Register() {
  const navigate = useNavigate()
  const [isShownP,setisShownP] =useState(false);
  const [isShownCP,setisShownCP] =useState(false);
  const [error,seterror] =useState({
    name:false,
    email:false,
    password:false,
    confirmPassword:false
  });
  const passwordToggling = ()=>{
    setisShownP(!isShownP)
  }
  const confirmpasswordToggling = ()=>{
    setisShownCP(!isShownCP)
  }
  const [formdata , setformdata] =useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const formFields  =[
      {
        name:"name",
        type:"text",
        icon:<FaRegUser/>,
        placeholder:"Name",
        value:formdata.name,
        onchange : (e) =>{
          setformdata({...formdata,name:e.target.value})
        }
      },
      {
        name:"email",
        type:"email",
        icon:<MdOutlineMail/>,
        placeholder:"Email",
        value:formdata.email,
        onchange : (e) =>{
          setformdata({...formdata,email:e.target.value})
        }
      },
      {
        name:"password",
        type:isShownP?'text':"password",
        icon:<CiLock/>,
        placeholder:"Password",
        value:formdata.password,
        iconEnd:isShownP?<FaRegEyeSlash onClick={passwordToggling} cursor={"pointer"} style={{marginRight:'0.3rem'}}/>:<FaRegEye onClick={passwordToggling} cursor={"pointer"} style={{marginRight:'0.3rem'}}/>,
        onchange : (e) =>{
          setformdata({...formdata,password:e.target.value})
        }
      },
      {
        name:"confirmPassword",
        type:isShownCP?'text':"password",
        icon:<CiLock/>,
        placeholder:"Confirm Password",
        value:formdata.confirmPassword,
        iconEnd:isShownCP?<FaRegEyeSlash onClick={confirmpasswordToggling} cursor={"pointer"} style={{marginRight:'0.3rem'}}/>:<FaRegEye onClick={confirmpasswordToggling} cursor={"pointer"} style={{marginRight:'0.3rem'}}/>,
        onchange : (e) =>{
          setformdata({...formdata,confirmPassword:e.target.value})
        }
      }
  ]

  const ErrorMessages = {
    name:{
      message:"Name is required",
      isValid:formdata?.name?.length>0,
      onError: ()=>{
        seterror((error)=>({...error,name:true}))
      }
    },
    email:{
      message:"Email is required",
      isValid:formdata?.email?.length>0,
      onError: ()=>{
        seterror((error)=>({...error,email:true}))
      }
    },
    password:{
      message:"Field is required",
      isValid:formdata.password.length>0,
      onError: ()=>{
        seterror((error)=>({...error,password:true}))
      }
    },
    confirmPassword:{
      message:"Field is required",
      isValid:formdata.confirmPassword.length>0,
      onError: ()=>{
        seterror((error)=>({...error,confirmPassword:true}))
      }
    },
  }


  //for sending toast 
  const notify =(data)=>{
    toast(data,{
    className:'custom-toast',
    progressClassName:'custom-progress-login',
    style:{color:'white',fontFamily:'Poppins',fontWeight:'bold',textAlign:'center',fontSize:'15px'}
    })
    }

  //onsubmit button click 

  const onSubmit =(event)=>{
    let isError = false
    event.preventDefault()
    console.log("form submitted");
    console.log(formdata)
    console.log(error)
     notify("Register Clicked")
    Object.keys(ErrorMessages).forEach((key)=>{
      if(!ErrorMessages[key].isValid){
        isError=true
        ErrorMessages[key].onError()
      }
    })
    if(!isError){
      //now i have to call the api
      navigate('/login')
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Register_Login/>
      </div>
      <div className={styles.right}>
       <Form newUser={true} ErrorMessages={ErrorMessages}  error={error} formFields={formFields} onSubmit={onSubmit} />
      </div>
    </div>
  )
}

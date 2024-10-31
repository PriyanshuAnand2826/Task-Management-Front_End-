import React,{useState} from 'react'
import styles from './Settings.module.css'
import Sidebar from '../components/Sidebar'
import { CiUser } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { CiLock } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { updateUser } from '../services/auth';
import { ToastContainer,toast } from 'react-toastify';






function Setting_form ({data}){
  return (
    <div  className={styles.field_container}>
    {data.icon}
    <input  
      className={styles.input_field} 
      type={data.type}
      name={data.name}
      placeholder={data.placeholder}
      value={data.value}
      onChange={data.onchange}
     
    />
    {data?.iconEnd}
    </div>
  )
}

export default function Settings() {
  const [isShownP,setisShownP] =useState(false);
  const [isShownCP,setisShownCP] =useState(false);
  
  const oldpasswordToggling = ()=>{
    setisShownP(!isShownP)
  }
  const newpasswordTogling = ()=>{
    setisShownCP(!isShownCP)
  }

  const [formdata,setformdata] = useState({
    name:"",
    email:"",
    oldpassword:"",
    newpassword:""
  })

  const [error,seterror] =useState({
    name:false,
    email:false,
    oldpassword:false,
    newpassword:false
  });


  const formFields =[
    {
      name:'name',
      type:'text',
      placeholder:'Name',
      icon:<CiUser className={styles.icon} size={18} />,
      onchange : (e) =>{
        setformdata({...formdata,name:e.target.value})
      }
      

    },
    {
      name:'email',
      type:'email',
      placeholder:'Update Email',
      icon:<CiMail  className={styles.icon} size={18}/>,
      onchange : (e) =>{
        setformdata({...formdata,email:e.target.value})
      }
    },
    {
      name:'oldpassword',
      type:isShownP?'text':"password",
      placeholder:'Old Password',
      icon:<CiLock  className={styles.icon} size={18}/>,
      iconEnd:isShownP?<FaRegEyeSlash cursor={"pointer"}  onClick={oldpasswordToggling} className={styles.icon}/>:<FaRegEye  cursor={"pointer"} onClick={oldpasswordToggling} className={styles.icon}/>,
      onchange : (e) =>{
        setformdata({...formdata,oldpassword:e.target.value})
      }



    },
    {
      name:'newpassword',
       type:isShownCP?'text':"password",
      placeholder:'New Password',
      icon:<CiLock  className={styles.icon} size={18}/>,
      iconEnd:isShownCP?<FaRegEyeSlash cursor={"pointer"}  onClick={newpasswordTogling} className={styles.icon}/>:<FaRegEye  cursor={"pointer"} onClick={newpasswordTogling} className={styles.icon}  />,
      onchange : (e) =>{
        setformdata({...formdata,newpassword:e.target.value})
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
    oldpassword:{
      message:"Field is required",
      isValid:formdata.oldpassword.length>0,
      onError: ()=>{
        seterror((error)=>({...error,oldpassword:true}))
      }
    },
    newpassword:{
      message:"Field is required",
      isValid:formdata.newpassword.length>0,
      onError: ()=>{
        seterror((error)=>({...error,newpassword:true}))
      }
    },
  }

  const notify =(data)=>{
    toast(data,{
    className:'custom-toast',
    progressClassName:'custom-progress-login',
    style:{color:'white',fontFamily:'Poppins',fontWeight:'bold',textAlign:'center',fontSize:'15px'}
    })
    }

  const handleUpdate =async (event)=>{
    let isError =false;
    event.preventDefault()
     console.log("update clicked")
     Object.keys(ErrorMessages).forEach((key)=>{
      if(!ErrorMessages[key].isValid){
        isError=true
        ErrorMessages[key].onError()
        
      }
     
    })
    if(!isError){
      const res = await updateUser(formdata)
      console.log(res)
      notify(res.data.message)
    }
  }

  const handleEnterpress=(event)=>{
    if(event.key === 'Enter'){
      handleUpdate()
    }
  }



   
  return (
    <div className={styles.container}>
    <div className={styles.left}>
      <Sidebar/>
    </div>
    <div className={styles.right}>
      <p style={{fontSize:'20px'}}>Settings</p>
      
     <form className={styles.form}>
     
        {formFields.map((data,index)=>{
          return(
            <>
            <Setting_form data={data} error={error} ErrorMessages={ErrorMessages}/>
            {error[data.name] ? (
              <p
                style={{
                  color: "red",
                  fontSize: "0.8rem",
                  marginRight: "9rem",
                  marginTop: "0.3rem",
                }}
              >
                {ErrorMessages[data.name].message}
              </p>
            ) : null}
            </>
          )
        })}
      <button className={styles.btn} onKeyPress={handleEnterpress} onClick={handleUpdate} >Update</button>
      <ToastContainer
          position="top-center"
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
     </form>
    </div>
  </div>
  )
}

import React,{useState} from 'react'
import styles from './Settings.module.css'
import Sidebar from '../components/Sidebar'
import { CiUser } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { CiLock } from "react-icons/ci";
import { CiMail } from "react-icons/ci";






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
  const formFields =[
    {
      name:'name',
      type:'text',
      placeholder:'Name',
      icon:<CiUser className={styles.icon} size={18} />,
      

    },
    {
      name:'email',
      type:'email',
      placeholder:'Update Email',
      icon:<CiMail  className={styles.icon} size={18}/>
    },
    {
      name:'password',
      type:isShownP?'text':"password",
      placeholder:'Old Password',
      icon:<CiLock  className={styles.icon} size={18}/>,
      iconEnd:isShownP?<FaRegEyeSlash cursor={"pointer"}  onClick={oldpasswordToggling} className={styles.icon}/>:<FaRegEye  cursor={"pointer"} onClick={oldpasswordToggling} className={styles.icon}/>



    },
    {
      name:'updatePassword',
       type:isShownCP?'text':"password",
      placeholder:'New Password',
      icon:<CiLock  className={styles.icon} size={18}/>,
      iconEnd:isShownCP?<FaRegEyeSlash cursor={"pointer"}  onClick={newpasswordTogling} className={styles.icon}/>:<FaRegEye  cursor={"pointer"} onClick={newpasswordTogling} className={styles.icon}  />
    }
  ]
   
  return (
    <div className={styles.container}>
    <div className={styles.left}>
      <Sidebar/>
    </div>
    <div className={styles.right}>
      <p style={{fontSize:'20px'}}>Settings</p>
      
     <form action="" className={styles.form}>
     <p>You can Update one field at once </p>
        {formFields.map((data,index)=>{
          return(
            <Setting_form data={data}/>
          )
        })}
      <button className={styles.btn}>Update</button>
     </form>
    </div>
  </div>
  )
}

import React from 'react'
import styles from './Register-Login.module.css'
import assest from '../assets/Register_Assest.png'

export default function Register_Login() {
  return (
    <div className={styles.container}>
      <div className={styles.circle} ><img className={styles.img} src={assest} alt="Register Page" /></div>
      
      <p style={{color:'white',marginTop:'2.9rem',fontSize:'1.5rem'}}>Welcome aboard my friend</p>
      <span  style={{color:'white',fontSize:'0.9rem'}}>just a couple of clicks and we start</span>
    </div>
  )
}

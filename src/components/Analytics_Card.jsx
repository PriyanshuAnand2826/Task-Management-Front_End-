import React from 'react'
import styles from './Analytics_Card.module.css'
import { GoDotFill } from "react-icons/go";





function Analytics_field ({data}){
  return(
    <div className={styles.field_container}>
      <div className={styles.task_name}>
       <GoDotFill color='#90C4CC'
        style={{marginTop:'3%'}}
       />
       <p>{data.name}</p>
      </div>
      <div className={styles.task_number}>
        {data.number}
      </div>
    </div>
  )
}






export default function Analytics_Card({dataArray}) {
  return (
    <div className={styles.container}>
      {dataArray.map((data,index)=>{
        return(
          <Analytics_field key={index} data={data}/>
        )
      })}
    </div>
  )
}

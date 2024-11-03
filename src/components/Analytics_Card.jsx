import React from 'react'
import styles from './Analytics_Card.module.css'
import { GoDotFill } from "react-icons/go";





function Analytics_field ({tasktype,count}){
  return(
    <div className={styles.field_container}>
      <div className={styles.task_name}>
       <GoDotFill color='#90C4CC'
        style={{marginTop:'3%'}}
       />
       <p>{tasktype}</p>
      </div>
      <div className={styles.task_number}>
        {count}
      </div>
    </div>
  )
}






export default function Analytics_Card({dataArray}) {
  console.log(dataArray)
  return (
    <div className={styles.container}>
      {dataArray ? 
      (<div>
      {Object.entries(dataArray).map(([item,n])=>
      <>
      <Analytics_field tasktype={item} count={n} />
         {/* <span>{item}</span>
         <span>{n}</span>
         </>)} */}
      </>
         )}
      </div>)
      : <p>Loading....</p>}
      {/* <ul>
        {Object.entries(dataArray).forEach(([tasktype,count])=>(
          <li key={tasktype}>
            {tasktype} : {count}
          </li>
        ))}
      </ul> */}
     {/* {
      Object.entries(dataArray).map(([tasktype,count])=>(
         <Analytics_field tasktype={tasktype} count={count} />
      ))
     } */}
    </div>
  )
}

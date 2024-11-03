import React, { useEffect, useState } from "react";
import styles from "./Analytics.module.css";
import Sidebar from "../components/Sidebar";
import Analytics_Card from "../components/Analytics_Card";
import axios from "axios";
import { getPriorityCount, getTask, getTasktypeCount } from "../services/task";

export default function Analytics() {
 const [tasktypecount, setTasktypecount] = useState(null);
 const [priorityCount, setPriorityCount] = useState(null);

  useEffect(()=>{
    const fetchdata = async () => {
      try {
        const res = await getTasktypeCount()
     
        if(res.data.success){
         setTasktypecount(res.data.data)
        }

        const res1 = await getPriorityCount()
        if(res1.data.success){
           setPriorityCount(res1.data.data)
        }
        
        
      } catch (error) {
         return error 
      }
    }
    fetchdata()
  },[])


  
  // const leftCardData = [
  //   { 
  //     name: "Backlog",
  //      number: backlogcount
  //      },
  //   { 
  //     name: "In Progress",
  //      number: ProgressCount
  //     },
  //   { 
  //     name: "Done",
  //      number: done
  //     },
  //   {
  //     name: "To-Do",
  //     number: Todocount,
  //   },
  // ];


  const rightCardData = [
    { 
      name: "Low Priority",
       number: 12
       },
    { 
      name: "Medium Priority",
       number: 8 
      },
    { 
      name: "High Priority",
       number: 5 
      },
    {
      name: "Due-Date Tasks",
      number: 10,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Sidebar />
      </div>
      <div className={styles.right}>
     
        <Analytics_Card dataArray={tasktypecount}/>
        <Analytics_Card  dataArray={priorityCount} /> 
      
        
      </div>
    </div>
  );
}

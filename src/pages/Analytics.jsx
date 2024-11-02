import React, { useEffect, useState } from "react";
import styles from "./Analytics.module.css";
import Sidebar from "../components/Sidebar";
import Analytics_Card from "../components/Analytics_Card";
import axios from "axios";
import { getTask } from "../services/task";

export default function Analytics() {
  const [backlogcount,setbacklogCount] =useState(0)
  const [ProgressCount,setProgresscount] =useState(0)
  const [Todocount,settodocount] =useState(0)
  const [done,setdone] =useState(0)
  const [leftCard,setLeftCard] =useState([])
  const [rightCard,setRightCard] =useState([])

  useEffect(()=>{
     const fetchData =async ()=>{
        try {
          const res = await getTask()
          console.log(res.data.user_task)
          res.data.user_task.map((item,index)=>{
            if(item.tasktype === 'Todo'){
              settodocount(count+1)
              setLeftCard((prev)=>[...prev,{name:'Todo',number:Todocount}])
            }
            if(item.tasktype==='progress'){
              setProgresscount(count+1)
              setLeftCard((prev)=>[...prev,{name:'Progress',number:ProgressCount}])
            }
            if(item.tasktype==='done'){
              setdone(count+1)
              setLeftCard((prev)=>[...prev,{name:'Done',number:done}])
            }
            if(item.tasktype === 'backlog'){
              setbacklogCount(count+1)
              setLeftCard((prev)=>[...prev,{name:'Backlog',number:backlogcount}])
            }
          })
        } catch (error) {
          return error
        }
     }
     fetchData()
  },[])

  // console.log(leftCard)
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
        <Analytics_Card dataArray={leftCard} />
        <Analytics_Card dataArray={rightCardData} />
        
      </div>
    </div>
  );
}

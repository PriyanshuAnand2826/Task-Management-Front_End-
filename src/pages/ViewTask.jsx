import React, { useEffect,useState } from "react";
import styles from "./ViewTask.module.css";
import { useParams } from "react-router-dom";
import { getTaskbyId } from "../services/task";
import promanage from "../assets/codesandbox.png";
import { GoDotFill } from "react-icons/go";
import formatDate from "../data/formatDate";
import shortFormatdate from "../data/shortFormatdate";

export default function ViewTask() {
  const { id } = useParams();
  const [colorPriroity,setColorPriority] =useState()
  const [count,setcount] =useState(0)
  const [data,setdata] =useState({
    title: "",
    priority:"",
    taskdata:[],
    totallength:'',
    duedate:''
  })
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTaskbyId(id);
        console.log(res)
        if(res.data.success){
            setdata({
              title: res.data.data.taskname,
              priority:res.data.data.priority,
              taskdata:res.data.data.taskdata,
              totallength:res.data.data.taskdata.length,
              duedate:res.data.data?.duedate
            })
        }
        if(res.data.data.priority==='low'){
          setColorPriority('#63C05B')
        }
        if(res.data.data.priority==='medium'){
          setColorPriority('#18B0FF')
        }
        if(res.data.data.priority==='high'){
          setColorPriority('#FF2473')
        }
        res.data.data.taskdata.map((item,index)=>{
          if(item.checked){
            setcount(count+1)
          }
        })
       
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
    
  },[]);

  const checkedCount = data.taskdata.filter(item => item.checked).length;
  const {date} =shortFormatdate(data.duedate)

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.field_container}>
          <img className={styles.img} src={promanage} alt="" />
          <p
            className={styles.name}
            style={{ fontWeight:"bold"}}
          >
            Pro manage
          </p>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.right_container}>
           <div className={styles.header}>
            <GoDotFill color={colorPriroity} />
            <span style={{fontSize:'12px',color:'#707070',textTransform:'uppercase'}}>{data.priority} Priority</span>
           </div>
           <p style={{marginTop:'5%',fontSize:'20px'}}>{data.title}</p>
           <p style={{marginTop:'5%'}}>Checklist ({checkedCount}/{data.totallength})</p>
           {data.taskdata.map((item,index)=>{
            return(
              <div key={index} className={styles.checklist}>
              <input type="checkbox" checked={item.checked} />
              <p style={{fontSize:'13px',marginLeft:'2%'}}>{item.taskn}</p>
           </div>
            )
           })}
           
           {data.duedate && <div className={styles.footer}>
              <p>Due Date</p>
              <button className={styles.btn} style={{backgroundColor:'#CF3636',color:'white'}}>{date}</button>
           </div>}
           
        </div>
      </div>
    </div>
  );
}

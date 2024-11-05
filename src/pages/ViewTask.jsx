import React, { useEffect,useState } from "react";
import styles from "./ViewTask.module.css";
import { useParams } from "react-router-dom";
import { getTaskbyId } from "../services/task";
import promanage from "../assets/codesandbox.png";
import { GoDotFill } from "react-icons/go";
import formatDate from "../data/formatDate";
import shortFormatdate from "../data/shortFormatdate";
import { MdContentCopy } from "react-icons/md";
import { ToastContainer,toast } from "react-toastify";

export default function ViewTask() {
  const { id } = useParams();
  const [colorPriroity,setColorPriority] =useState()
  const [count,setcount] =useState(0)
  const [error,seterror] =useState(false)
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
        if(res.status === 404){
         seterror(true)
        }
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
        if(res.data.data.priority==='mid'){
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
  const notify =(data)=>{
    toast(data,{
    className:'custom-toast',
    progressClassName:'custom-progress-login',
    style:{color:'white',fontFamily:'Poppins',fontWeight:'bold',textAlign:'center',fontSize:'15px'}
    })
    }
     const link = `https://task-management-front-end-gules.vercel.app/viewtask/${id}`
    const handleCopyClick=async()=>{
       try {
        if(error){
          notify("Can't Copy Task is Deleted")
        }
        else{
          await navigator.clipboard.writeText(link); 
          notify('Link copied to clipboard!');
        }
         
       } catch (error) {
        notify('Failed to copy: ', err); 
       } 
    }

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
            <div className={styles.sub_header}>
            <GoDotFill color={colorPriroity} />
            <span style={{fontSize:'12px',color:'#707070',textTransform:'uppercase'}}>{data.priority} Priority</span>
            </div>
            <div className={styles.sub_header1}>
               <MdContentCopy size={20} style={{marginRight:'10%'}} cursor={"pointer"} onClick={handleCopyClick}/>
               
            </div>
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
            <ToastContainer
          position="top-right"
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
           
           
           {data.duedate && <div className={styles.footer}>
              <p>Due Date</p>
              <button className={styles.btn} style={{backgroundColor:'#CF3636',color:'white'}}>{date}</button>
           </div>}
           
        </div>
      </div>
    </div>
  );
}

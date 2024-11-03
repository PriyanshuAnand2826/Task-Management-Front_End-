import React, { useRef, useEffect, useState } from "react";
import styles from "./AddTask.module.css";
import { GoDotFill } from "react-icons/go";
import { FaAngleDown } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import formatDate from "../data/formatDate";
import { ToastContainer, toast } from "react-toastify";
import { getSearchUser } from "../services/auth";
import getFirstTwoLettersOfEmail from "../data/nameLogo";
import { CreateTask, getTaskbyId, updateTask } from "../services/task";

function Priority({ title, color, onClick, isClicked }) {
  return (
    <div
      onClick={onClick}
      className={styles.priroty_status}
      style={{ backgroundColor: isClicked ? "#EEECEC" : null }}
    >
      <GoDotFill color={color} size={15} />
      <p style={{ fontSize: "12px", color: "#767575" }}>{title}</p>
    </div>
  );
}

// main exported component

export default function AddTask({ onClose ,id,mode}) {
  //all states
  console.log(id)
  const [isShown, setisShown] = useState(false);
  const [tasklist, setTasklist] = useState([]);
  const [users, setusers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [checkedCount, setCheckedCount] = useState(0);
  const [inputType, setInputType] = useState("text");
  const [error, setError] = useState({
    taskTitle: false,
    Priorty: false,
    taskLength: false,
    taskName: false,
  });
  const [prioirty, setPriority] = useState({
    high: false,
    mid: false,
    low: false,
  });
    

 const [data,setdata] =useState({
    title: "",
    priority:"",
    taskdata:[],
    totallength:'',
    duedate:''
  })













  //all refs
  //ref to take the current value
  const taskRef = useRef(null);
  const assiginRef = useRef(null);
  const dateRef = useRef(null);
  const taskdata_ref = useRef(null)
  const taskdatacheck_ref = useRef(null)

  //sending toast
  const notify = (data) => {
    toast(data, {
      className: "custom-toast",
      progressClassName: "custom-progress-login",
      style: {
        color: "white",
        fontFamily: "Poppins",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: "15px",
      },
    });
  };

  const today = new Date().toISOString().split("T")[0];

  const handleEnterPress = async (event) => {
    if (event.key === "Enter") {
      try {
        const res = await getSearchUser(assiginRef.current.value);
        // console.log(res);
        if ((res.status === 200)) {
          const data = res.data.user;
          // console.log(data);
          setSearchResults(data);
        }
        if (res.status === 201) {
          notify("User not found");
        }
      } catch (error) {}
    }
  };

  //assign click 
  const handleAssignClick =(index)=>{
   // console.log(searchResults[index].email)
    assiginRef.current.value=searchResults[index].email;
  }

  //adding task
  const handleAdd = () => {
    setTasklist((prev) => [...prev, { id: tasklist.length + 1 }]);
  };

  //managing task
  const handleOnchange = (event, index) => {
    const enterTask = [...tasklist];
    enterTask[index].taskn = event.target.value;
    setTasklist(enterTask);
  };

  //handle checkbox click
  const handleCheckboxClick = (event, index) => {
    const checkbox = [...tasklist];
    checkbox[index].checked = event.target.checked;

    if (event.target.checked) {
      setCheckedCount(checkedCount + 1);
    } else {
      setCheckedCount(checkedCount - 1);
    }
    setTasklist(checkbox);
  };
  //handle delete
  const handleDelete = (id) => {
    const newlist = tasklist.filter((item) => item.id !== id);
    setTasklist(newlist);
    tasklist.map((item,index)=>{
      if(id === item.id && item.checked){
        setCheckedCount(checkedCount-1)
      }
    })
  }


  //handle save button
  const handleSave = async() => {
    if (taskRef.current.value.length === 0) {
      setError((error) => ({ ...error, taskTitle: true }));
    }
    if (
      prioirty.high === false &&
      prioirty.mid === false &&
      prioirty.low === false
    ) {
      setError((error) => ({ ...error, Priorty: true }));
    }

    if (tasklist.length === 0) {
      setError((error) => ({ ...error, taskLength: true }));
    }
    {
      tasklist.map((item) => {
        if (!item.taskName || item.taskName === "") {
          setError((error) => ({ ...error, taskName: true }));
        }
      });
    }
     

    

    const res = await CreateTask({
      taskname:taskRef.current.value,
      priority:Object.keys(prioirty)[0],
      assign:assiginRef.current.value,
      taskdata:tasklist,
      duedate:dateRef.current.value
    })

    if(res.data.success){
      notify(res.data.message)
      setTimeout(()=>{
        onClose()
      },2500)
    }

   
  };

  const handleUpdate =async()=>{
    console.log("update clicked")
    const res = await updateTask(id,{
      taskname:taskRef.current.value,
      priority:Object.keys(prioirty)[0],
      assign:assiginRef.current.value,
      taskdata:tasklist,
      duedate:dateRef.current.value
    })
    console.log(res)
    if(res.data.success){
      notify(res.data.message)
      setTimeout(()=>{
        onClose()
      },2500)
    }
  }
  

  useEffect(()=>{
    const fetchTask =async()=>{
      if (mode === 'edit' && id){
        try {
          const res = await getTaskbyId(id)
          console.log(res)
          if(res.data.success){
             taskRef.current.value = res.data.data.taskname || null
            //  assiginRef.current.value = res.data.data.assign_email || null
             dateRef.current.value = res.data.data.duedate || null

             prioirty[res.data.data.priority] =true
             setTasklist(res.data.data.taskdata || [])
             const count = res.data.data.taskdata.reduce((acc, task) => (task.checked ? acc + 1 : acc), 0);
             setCheckedCount(count);
              
             
          }
        } catch (error) {
          return error
        }
      }
     
    }
    fetchTask();
  },[id])
 

  return (
    <div className={styles.container}>
      <div className={styles.input_container}>
        <label htmlFor="title">
          Title <span style={{ color: "red" }}>*</span>
        </label>
        <input
          ref={taskRef}
          type="text"
          className={styles.input_field}
          placeholder="Enter Task Title"
          name="title"
        
        />
      </div>
      {error.taskTitle ? (
        <p
          style={{
            color: "red",
            fontSize: "0.8rem",
            marginLeft: "5px",
            marginTop: "3px",
          }}
        >
          Task title is required
        </p>
      ) : null}
      <div className={styles.priority_container}>
        <p style={{ marginTop: "0.5%" }}>
          Select Priority <span style={{ color: "red" }}>*</span>
        </p>
        <Priority
          title={"HIGH PRIORITY"}
          color={"#FF2473"}
          isClicked={prioirty.high}
          onClick={() => setPriority({ high: true })}
        />
        <Priority
          title={"MODERATE PRIORITY"}
          color={"#18B0FF"}
          isClicked={data.priority||prioirty.mid}
          onClick={() => setPriority({ mid: true })}
        />
        <Priority
          title={"LOW PRIORITY"}
          color={"#63C05B"}
          isClicked={prioirty.low}
          onClick={() => setPriority({ low: true })}
        />
      </div>
      {error.Priorty ? (
        <p
          style={{
            color: "red",
            fontSize: "0.8rem",
            marginLeft: "5px",
            marginTop: "3px",
          }}
        >
          Priority is required
        </p>
      ) : null}
      <div className={styles.assign_container}>
        <label htmlFor="assign" style={{ width: "auto", marginTop: "0.5%" }}>
          Assign to
        </label>
        <div
          onClick={() => setisShown(!isShown)}
          className={styles.assign_input_container}
          onKeyPress={handleEnterPress}
        >
          <input
            type="text"
            ref={assiginRef}
            name="assign"
            className={styles.dropdown}
          />{" "}
          <FaAngleDown
            style={{ flex: "1", marginTop: "1%" }}
            cursor={"pointer"}
          />
        </div>
      </div>
    
      {isShown ?
      <>
      {searchResults.map((item,index)=>{
        return(
          <div key={index} className={styles.options}>
          <button className={styles.btn_logo}>{getFirstTwoLettersOfEmail(item.email)===""?"NO":getFirstTwoLettersOfEmail(item.email)}</button>

          <p style={{ marginTop: "2%", marginLeft: "5%", width: "75%" }}>
            {item.email}
          </p>
          <button className={styles.assign_btn} onClick={()=>handleAssignClick(index)}>Assign</button>
        </div>
        )
      })}
        
        </>
       : null}

      <div className={styles.checklist}>
        <p style={{ marginTop: "2%", fontFamily: "Inter" }}>
          Checklist ({checkedCount}/{tasklist.length}){" "}
          <span style={{ color: "red" }}>*</span>
        </p>
        {error.taskLength ? (
          <p
            style={{
              color: "red",
              fontSize: "0.8rem",
              marginLeft: "5px",
              marginTop: "3px",
            }}
          >
            At Least 1 task Should be there
          </p>
        ) : null}
        {tasklist.map((field, index) => {
          return (
            <div key={field.id} className={styles.task_container}>
              <input
                type="checkbox"
                checked={field.checked}
                placeholder="Enter Task"
                style={{ cursor: "pointer" }}
                onChange={(event) => {
                  handleCheckboxClick(event, index);
                }}
              />
              <input
                type="text"
                value={field.taskn}
                placeholder="Enter Task"
                className={styles.task_input_field}
                onChange={(event) => handleOnchange(event, index)}
              />
              <MdDelete
                cursor={"pointer"}
                onClick={() => handleDelete(field.id)}
                color="#CF3636"
                size={20}
              />
            </div>
          );
        })}
        {error.taskName ? (
          <p
            style={{
              color: "red",
              fontSize: "0.8rem",
              marginLeft: "5px",
              marginTop: "3px",
            }}
          >
            Task Name is required
          </p>
        ) : null}

        <div className={styles.add_item} onClick={handleAdd}>
          <FaPlus color="#767575" size={17} />
          <p style={{ color: "#767575" }}>Add item</p>
        </div>
      </div>

      <div className={styles.footer}>
        <div>
          <input
            type={inputType}
            onFocus={() => setInputType("date")}
            onBlur={() => setInputType("text")}
            className={styles.date}
            placeholder="Select Due Date"
            ref={dateRef}
            min={today}
          />
        </div>
        <div className={styles.btn_container}>
          <button className={styles.btn_cancel} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.btn_save} onClick={() => id ? handleUpdate():  handleSave()}>
            {id ? "Update" : "Save"}
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
    </div>
  );
}

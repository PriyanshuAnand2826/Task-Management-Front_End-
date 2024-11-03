import React, { useEffect, useState,useRef } from "react";
import styles from "./Home.module.css";
import Sidebar from "../components/Sidebar";
import formatDate from "../data/formatDate";
import { GoPeople } from "react-icons/go";
import TaskTypeCard from "../components/TaskTypeCard";
import { VscCollapseAll } from "react-icons/vsc";
import { IoAddSharp } from "react-icons/io5";
import Modal from "../../Modal";
import AddTask from "../components/AddTask";
import { ToastContainer } from "react-toastify";
import { getTask } from "../services/task";
import AddBoard from "../components/AddBoard";
import filterTasks from "../data/filterTask";

export default function Home() {
  const { date } = formatDate();
  const [isModalOpen, setIsModalOpen] = useState(false); //for task modal
  const [isBoardModal, SetIsBoardModal] = useState(false); //for task modal
  const name = localStorage.getItem("name")
  const firstName = name.split(" ")[0];
  const [Backlog,setBacklog] = useState([])
  const [Progress,setProgress] = useState([])
  const [Todo,setTodo] = useState([])
  const [Done,SetDone] = useState([])
  const [filteredTasks, setFilteredTasks] = useState();
  const [selectedFilter, setSelectedFilter] = useState("thisWeek"); // Default filter


  const btn_data =[
    {
     Todo:[
       {name:'backlog',value:'backlog'},
       {name:'progress',value:'progress'},
       {name:'done',value:'done'}
     ] 
    },
    {
      Backlog:[
        {name:'Todo',value:'Todo'},
        {name:'progress',value:'progress'},
        {name:'done',value:'done'}
      ] 
    },
    {
      Progress:[
        {name:'backlog',value:'backlog'},
        {name:'Todo',value:'Todo'},
        {name:'done',value:'done'}
      ] 
    },
    {
      Done:[
        {name:'backlog',value:'backlog'},
        {name:'Todo',value:'Todo'},
        {name:'progress',value:'progress'}
      ]
    }
  ]

  //for opening the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // for closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openBoardModal =()=>{
   SetIsBoardModal(true)
  }
  

  const closeBoardModal =()=>{
    SetIsBoardModal(false)
  }
  // function handleFilterChange(event) {
  //   const filter = event.target.value;
  //   setSelectedFilter(filter);
  //   console.log(filter)
  // }

  // function filterTasksByDropdown(tasks, filter) {
  //   const filtered = filterTasks(tasks); // Call your filter function
  //   setFilteredTasks(filtered[filter]);
  //   console.log(filteredTasks) 
  // }
 
  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await getTask();
        // filterTasksByDropdown(res.data.user_task, selectedFilter); 
       
         
         if(res.data.success){
          res.data.user_task.map((item,index)=>{
              if(item.tasktype==='Todo'){
                 setTodo((prev)=>[...prev,item])
               
              }
              if(item.tasktype==='progress'){
                setProgress((prev)=>[...prev,item])
                
             }
             if(item.tasktype==='done'){
              SetDone((prev)=>[...prev,item])
            
           }
           if(item.tasktype==='backlog'){
            setBacklog((prev)=>[...prev,item])
           
         }
         
           


          })
         }
        
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData(); // Call the async function
    console.log(btn_data[0])

  },[]);

  console.log((Todo))

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Sidebar />
      </div>
      <div className={styles.right}>
        <div className={styles.right_header}>
          <p style={{ fontWeight: "bold" }}>Welcome{","}{firstName}</p>
          <p style={{ color: "#707070" }}>{date}</p>
        </div>
        <div className={styles.subheader}>
          <div className={styles.left_board}>
            <p style={{ fontWeight: "bold" }}>Board</p>
            <div style={{ cursor: "pointer" }} onClick={openBoardModal}>
              <GoPeople color="#707070" />
              <span
                style={{
                  color: "#707070",
                  fontSize: "15px",
                  marginLeft: "10px",
                }}
              >
                Add People
              </span>
            </div>
            {isBoardModal && <Modal><AddBoard closemodal={closeBoardModal}/></Modal>}
          </div>
          <div>
            <select className={styles.select} value={selectedFilter}name="filter" id="filter" >
              <option   value="thisWeek">This Week</option>
              <option value="today">Today</option>
              <option value="thisMonth">This Month</option>
            </select>
          </div>
        </div>
        <div className={styles.mid}>
          <TaskTypeCard
            name={"Backlog"}
            icon={
              <VscCollapseAll color="#767575" cursor={"pointer"} size={20} />
            }
            data={Backlog}
            btn_data={btn_data[1].Backlog}
          />
          <TaskTypeCard
            name={"To Do"}
            icon={
              <div style={{ display: "flex", gap: "10px" }}>
                <IoAddSharp onClick={openModal} cursor={"pointer"} size={20} />{" "}
                <VscCollapseAll color="#767575" cursor={"pointer"} size={20} />{" "}
              </div>
            }
            data={Todo}
            btn_data={btn_data[0].Todo}
          />
          <TaskTypeCard
            name={"In Progress"}
            icon={
              <VscCollapseAll color="#767575" cursor={"pointer"} size={20} />
            }
            data={Progress}
            btn_data={btn_data[2].Progress}
          />
          <TaskTypeCard
            name={"Done"}
            icon={
              <VscCollapseAll size={20} color="#767575" cursor={"pointer"} />
            }
            data={Done}
            btn_data={btn_data[3].Done}
          />
        </div>
      </div>
      {isModalOpen ? (
        <Modal>
          <AddTask onClose={() => setIsModalOpen(false)} />
        </Modal>
      ) : null}
       <ToastContainer
          position="top-right"
          autoClose={3000}
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

//this is a board page

import React,{useRef, useState,useEffect} from 'react'
import styles from './TaskCard.module.css'
import { GoDotFill } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import { FaCaretSquareDown } from "react-icons/fa";
import { FaCaretSquareUp } from "react-icons/fa";
import Modal from '../../Modal';
import Logout_Del from './Logout_Del';
import { DeleteTask, updateTaskType } from '../services/task';
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import shortFormatdate from '../data/shortFormatdate';
import getFirstTwoLettersOfEmail from '../data/nameLogo';
import AddTask from './AddTask';


export default function TaskCard({isCollapse,data,btn_data}) {
  const [isTaskVisible, setIsTaskVisible] = useState(false);
  const [isMenuVisible,setIsMenuVisible] =useState(false);
  const [isDeletemodelOpen, setIsDeletemodal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [colorPriroity,setColorPriority] =useState()
  const [isHigh,setIsHigh] =useState(false)
  const menuRef=useRef(null)
  const navigate = useNavigate()
  const {date} = shortFormatdate(data.duedate)
  // const str = data.assignee_name;
  const logo = data.assignee_name?.slice(0, 2);


  const openmodal = () => {
    setIsDeletemodal(true);
  };
  const closemodal = () => {
    setIsDeletemodal(false);
  };

  const openEditmodal =()=>{
    setIsEditModal(true)
  }
  const closeEditModal =()=>{
    setIsEditModal(false)
  }
  const handleDelete = async ()=>{
    try {
      const res = await DeleteTask(data._id)
      console.log(res)
      notify(res.data.message)
      closemodal()
    } catch (error) {
       return error
    }
     
  }
  const ModalData ={
    headtext:"Are you sure you want to Delete?",
    btn_top:'Yes, Delete',
    btn_bottom:'Cancel',
    onclose:()=>closemodal,
    onClick:()=>handleDelete
  }


  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuVisible(false)
    }
  };

  useEffect(() => {
    if (isMenuVisible) {
      document.addEventListener('click', handleClickOutside, true);
    } else {
      document.removeEventListener('click', handleClickOutside, true);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isMenuVisible]);

  useEffect(() => {
    setIsTaskVisible(!isCollapse);
  }, [isCollapse]);
 

  useEffect(()=>{
     if(data.priority === "medium"){
      setColorPriority("#18B0FF")
     }
     if(data.priority==='low'){
      setColorPriority("#63C05B")
     }
     if(data.priority==='high'){
      setColorPriority("#FF2473")
      setIsHigh(true)
     }

  },[colorPriroity])

  const checkedCount = data.taskdata.filter(item => item.checked).length;


  const handleArrowclick=()=>{
    setIsTaskVisible(!isTaskVisible)
    // setIsCollapse(!isCollapse)
    console.log(isCollapse)
    
  }
  const notify =(data)=>{
    toast(data,{
    className:'custom-toast',
    progressClassName:'custom-progress-login',
    style:{color:'white',fontFamily:'Poppins',fontWeight:'bold',textAlign:'center',fontSize:'15px'}
    })
    }

  const handletasktypeupdate =async (id,type)=>{
   const res = await updateTaskType(id,type)
   notify(res.data.message)
  }

  const handleShareClick=()=>{
    navigate(`/viewtask/${data._id}`)
  }

  const handleEditClick=()=>{
    setIsEditModal(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.priority}>
          <GoDotFill color={colorPriroity} style={{ marginTop: "4%" }} />
          <p>{data.priority} Priority</p>
         {data.assignee_name && <button className={styles.btn_logo}>{logo}</button> } 
        </div>
        <div className={styles.menu}>
          <BsThreeDots  cursor={'pointer'} onClick={()=>setIsMenuVisible(!isMenuVisible)} />
        </div>
      </div>
      {isMenuVisible &&  <div ref={menuRef} className={styles.options_menu}>
        <span onClick={handleEditClick}>Edit</span>
        <span onClick={handleShareClick}>Share</span>
        <span style={{color:'#CF3636'}} onClick={openmodal} >Delete</span>
      </div> }
      {isEditModal &&(<Modal>
        <AddTask
         id={data._id}
         onClose ={closeEditModal}
           />
      </Modal>)}
      {isDeletemodelOpen && (
        <Modal>
          <Logout_Del 
          
         ModalData={ModalData}
          />
        </Modal>
      )}
     
      <div className={styles.taskname}>{data.taskname}</div>

      <div className={styles.checklist}>
        <p>Checklist ({checkedCount}/{data.taskdata.length})</p>
        {(isTaskVisible) ? <FaCaretSquareUp 
        onClick={()=>handleArrowclick()}
        cursor={"pointer"}
        color='#B7B7B7'
        style={{ marginRight: "2%" }}
        /> :
        <FaCaretSquareDown
          onClick={() => handleArrowclick()}
          cursor={"pointer"}
          color='#B7B7B7'
          style={{marginRight: "2%" }}
        />
         }
        
      </div>

      {(isTaskVisible) ? <div className={styles.task_list}>
        {data.taskdata.map((item,index)=>{
          return(
            <div key={index} className={styles.task_container}>
            <input type="checkbox" checked={item.checked}/>
            <span style={{ marginTop: "5%" }}>{item.taskn}</span>
          </div>
          )
        })}
      </div> :null}
      <div className={styles.footer}>
        {data.duedate && <div className={styles.btn_date} style={{backgroundColor:isHigh ? '#CF3636':'#DBDBDB',color:isHigh?'#FFFFFF':'#5A5A5A'}}>
          <span>{date}</span>
        </div>}
        
        <div className={styles.btn_priority}>
          {btn_data.map((item,index)=>{
            return(
              <button onClick={()=>handletasktypeupdate(data._id,item.value)} className={styles.btn}>{item.name}</button>
            )
          })}
            <ToastContainer
          position="top-center"
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
        </div>
      </div>

     
    </div>

  )
}

import React,{useRef, useState,useEffect} from 'react'
import styles from './TaskCard.module.css'
import { GoDotFill } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import { FaCaretSquareDown } from "react-icons/fa";
import { FaCaretSquareUp } from "react-icons/fa";
import Modal from '../../Modal';
import Logout_Del from './Logout_Del';


export default function TaskCard({isCollapse}) {
  const [isTaskVisible, setIsTaskVisible] = useState(false);
  const [isMenuVisible,setIsMenuVisible] =useState(false);
  const [isDeletemodelOpen, setIsDeletemodal] = useState(false);
  const menuRef=useRef(null)

  const openmodal = () => {
    setIsDeletemodal(true);
  };
  const closemodal = () => {
    setIsDeletemodal(false);
  };
  const ModalData ={
    headtext:"Are you sure you want to Delete?",
    btn_top:'Yes, Delete',
    btn_bottom:'Cancel',
    onclose:()=>closemodal
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



  const handleArrowclick=()=>{
    setIsTaskVisible(!isTaskVisible)
    // setIsCollapse(!isCollapse)
    console.log(isCollapse)
    
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.priority}>
          <GoDotFill color="red" style={{ marginTop: "4%" }} />
          <p>High Priority</p>
          <button className={styles.btn_logo}>AK</button>
        </div>
        <div className={styles.menu}>
          <BsThreeDots  cursor={'pointer'} onClick={()=>setIsMenuVisible(!isMenuVisible)} />
        </div>
      </div>
      {isMenuVisible &&  <div ref={menuRef} className={styles.options_menu}>
        <span>Edit</span>
        <span>Share</span>
        <span style={{color:'#CF3636'}} onClick={openmodal} >Delete</span>
      </div> }
      {isDeletemodelOpen && (
        <Modal>
          <Logout_Del 
         ModalData={ModalData}
          />
        </Modal>
      )}
     
      <div className={styles.taskname}>Hero Section</div>

      <div className={styles.checklist}>
        <p>Checklist (0/0)</p>
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
        <div className={styles.task_container}>
          <input type="checkbox" />
          <span style={{ marginTop: "" }}>Task 1</span>
        </div>
      </div> :null}
      <div className={styles.footer}>
        <div className={styles.btn_date}>
          <span>25-Oct</span>
        </div>
        <div className={styles.btn_priority}>
           <button className={styles.btn}>Backlog</button>
           <button className={styles.btn}>Progress</button>
           <button className={styles.btn}>Done</button>
        </div>
      </div>

     
    </div>

  )
}

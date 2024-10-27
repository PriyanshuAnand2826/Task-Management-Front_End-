import React, { useState } from "react";
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

export default function Home() {
  const { date } = formatDate();
  const [isModalOpen, setIsModalOpen] = useState(false); //for notes modal

  //for opening the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // for closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Sidebar />
      </div>
      <div className={styles.right}>
        <div className={styles.right_header}>
          <p style={{ fontWeight: "bold" }}>Welcome!Kumar</p>
          <p style={{ color: "#707070" }}>{date}</p>
        </div>
        <div className={styles.subheader}>
          <div className={styles.left_board}>
            <p style={{ fontWeight: "bold" }}>Board</p>
            <div style={{ cursor: "pointer" }}>
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
          </div>
          <div>
            <select className={styles.select} name="filter" id="filter">
              <option  value="This Week">This Week</option>
              <option value="This Week">Today</option>
              <option value="This Month">This Month</option>
            </select>
          </div>
        </div>
        <div className={styles.mid}>
          <TaskTypeCard
            name={"Backlog"}
            icon={
              <VscCollapseAll color="#767575" cursor={"pointer"} size={20} />
            }
          />
          <TaskTypeCard
            name={"To Do"}
            icon={
              <div style={{ display: "flex", gap: "10px" }}>
                <IoAddSharp onClick={openModal} cursor={"pointer"} size={20} />{" "}
                <VscCollapseAll color="#767575" cursor={"pointer"} size={20} />{" "}
              </div>
            }
          />
          <TaskTypeCard
            name={"In Progress"}
            icon={
              <VscCollapseAll color="#767575" cursor={"pointer"} size={20} />
            }
          />
          <TaskTypeCard
            name={"Done"}
            icon={
              <VscCollapseAll size={20} color="#767575" cursor={"pointer"} />
            }
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

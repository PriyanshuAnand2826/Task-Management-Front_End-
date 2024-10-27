import React,{useState} from "react";
import styles from "./TaskTypeCard.module.css";
import { VscCollapseAll } from "react-icons/vsc";
import TaskCard from "./TaskCard";

export default function TaskTypeCard({
  name,
  icon,
}) {
  const [isCollapse,setIsCollapse] = useState(true);
  const handleCollapseAll = () => {
    setIsCollapse((prev) => !prev);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>{name}</p>
        <button onClick={handleCollapseAll} style={{background:'none',border:'none'}}>{icon}</button>
      </div>
      <div className={styles.task_card_container}>
        <TaskCard isCollapse={isCollapse}  />
        <TaskCard isCollapse={isCollapse} />
        <TaskCard isCollapse={isCollapse} />
        <TaskCard isCollapse={isCollapse}  />
        <TaskCard isCollapse={isCollapse} />
        <TaskCard isCollapse={isCollapse} />
      </div>
    </div>
  );
}

import React from "react";
import styles from "./Analytics.module.css";
import Sidebar from "../components/Sidebar";
import Analytics_Card from "../components/Analytics_Card";

export default function Analytics() {
  const leftCardData = [
    { 
      name: "Backlog",
       number: 12
       },
    { 
      name: "In Progress",
       number: 8 
      },
    { 
      name: "Done",
       number: 5 
      },
    {
      name: "To-Do",
      number: 10,
    },
  ];


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
        <Analytics_Card dataArray={leftCardData} />
        <Analytics_Card dataArray={rightCardData} />
        
      </div>
    </div>
  );
}

import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import promanage from "../assets/codesandbox.png";
import analytics from "../assets/database.png";
import settings from "../assets/settings.png";
import board from "../assets/layout.png";
import logout from "../assets/Logout.png";
import Modal from "../../Modal";
import Logout_Del from "./Logout_Del";
import { useNavigate,useLocation } from "react-router-dom";

function Field({ icon, name, isBold, index }) {
  return (
    <div className={styles.field_container}>
      <img className={styles.img} src={icon} alt="" />
      <p
        className={styles.name}
        style={{ fontWeight: isBold ? "bold" : "normal" }}
      >
        {name}
      </p>
    </div>
  );
}

export default function Sidebar() {
  const location = useLocation()
  const [isLogoutmodelOpen, setIsLogoutmodal] = useState(false);
  const navigate =useNavigate()
  const handleOnClick = (route) => {
    navigate(route)
  };
  const openmodal = () => {
    setIsLogoutmodal(true);
  };
  const closemodal = () => {
    setIsLogoutmodal(false);
  };
  const App_fields = [
    { name: "Board", icon: board ,navigate:'/board' },
    { name: "Analytics", icon: analytics,navigate:'/analytics' },
    { name: "Settings", icon: settings,navigate:'/settings' },
  ];

  const ModalData ={
    headtext:"Are you sure you want to Logout?",
    btn_top:'Yes, Logout',
    btn_bottom:'Cancel',
    onclose:()=>closemodal
  }
  return (
    <div className={styles.container}>
      <Field icon={promanage} name={"Pro Manage"} isBold={true} />
      <div className={styles.app_fields}>
        {App_fields.map((item, index) => {
          return (
            <div
              onClick={() => handleOnClick(item.navigate)}
              style={{
                backgroundColor: location.pathname === item.navigate ? "#4391ED1A" : null,
                borderRadius: location.pathname === item.navigate ? "7px" : null,
              }}
            >
              <Field key={index} icon={item.icon} name={item.name} />
            </div>
          );
        })}
      </div>
      <div className={styles.logout} onClick={openmodal}>
        <Field icon={logout} name={"Logout"} />
      </div>
      {isLogoutmodelOpen && (
        <Modal>
          <Logout_Del 
         ModalData={ModalData}
          />
        </Modal>
      )}
    </div>
  );
}

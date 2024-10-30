import React, { useEffect, useRef, useState } from "react";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Form_Fields({ data, index }) {
  return (
    <div className={styles.field_container}>
      {data.icon}
      <input
        className={styles.input_field}
        type={data.type}
        name={data.name}
        placeholder={data.placeholder}
        value={data.value}
        onChange={data.onchange}
      />
      {data?.iconEnd}
      {/* {label ? <label style={{fontSize:'1rem',marginLeft:'7px'}} id={name} htmlFor={name}>{label}</label> : null} */}
    </div>
  );
}

export default function Form({
  newUser,
  formFields,
  error,
  ErrorMessages,
  onSubmit,
}) {
  const navigate = useNavigate();
  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };
  const handleOnclick = () => {};
  return (
    <form className={styles.form}>
      <p style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        {newUser ? "Register" : "Login"}
      </p>
      {formFields.map((field, index) => {
        return (
          <>
            <Form_Fields key={index} data={field} index={index} />
            {error[field.name] ? (
              <p
                style={{
                  color: "red",
                  fontSize: "0.8rem",
                  marginRight: "9rem",
                  marginTop: "0.3rem",
                }}
              >
                {ErrorMessages[field.name].message}
              </p>
            ) : null}
          </>
        );
      })}
      <button
        className={styles.btn1}
        onKeyPress={handleEnterPress}
        onClick={onSubmit}
      >
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
          theme="darkk"
        />
        {newUser ? "Register" : "Login"}
      </button>
      <span
        className={styles.bottom_text}
        style={{ fontSize: "0.8rem", marginTop: "0.9rem" }}
      >
        {newUser ? "Have an Account ? " : "Have an account yet ?"}
      </span>
      <button
        className={styles.btn2}
        onClick={() => {
          newUser ? navigate("/login") : navigate("/");
        }}
      >
        {newUser ? "Login" : "Register"}
      </button>
    </form>
  );
}

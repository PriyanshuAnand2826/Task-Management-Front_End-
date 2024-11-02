import axios from "axios";

//register api 
export const register = async(data)=>{
  try {
   const res = await axios.post(`${import.meta.env.VITE_SOME_KEY}/user/register`,data,{
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
    }
   })
    return res;
  } catch (error) {
    return error
    
  }
}

//login api 
export const login =async (data)=>{
  try {
    const res = await axios.post(`${import.meta.env.VITE_SOME_KEY}/user/login`,data,{
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    return res
  } catch (error) {
    return error
  }
}


export const getAlluser =async ()=>{
  try {
    const res = await axios.get(`${import.meta.env.VITE_SOME_KEY}/user/alluser`)
    return res
  } catch (error) {
    return error
  }
 }

export const getSearchUser =async(searchchar)=>{
  try {
    const res = await axios.get(`${import.meta.env.VITE_SOME_KEY}/user/search/${searchchar}`)
    return res
  } catch (error) {
    return error
  }
}

export const updateUser = async (data)=>{
  try {
    const res = await axios.put(`${import.meta.env.VITE_SOME_KEY}/user/update`,data,{
      headers:{
        Authorization: `${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
      }
    })
    return res
  } catch (error) {
    return error
  }
}

export const AddBoard_ =async(email)=>{
 try {
  const res = await  axios.put(`${import.meta.env.VITE_SOME_KEY}/task/addboard`,{assign:email},{
    headers:{
        Authorization: `${localStorage.getItem("token")}`
    }
  })
  return res
 } catch (error) {
  return error
 }
}


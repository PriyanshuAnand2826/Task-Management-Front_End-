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


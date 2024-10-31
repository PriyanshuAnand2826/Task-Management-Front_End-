import axios from 'axios'

export const getTask =()=>{

}
export const CreateTask =async (data)=>{
     const res = await axios.post(`${import.meta.env.VITE_SOME_KEY}/task/create`,data,{
      headers:{
        Authorization: `${localStorage.getItem("token")}`
      }
     })
     return res
}
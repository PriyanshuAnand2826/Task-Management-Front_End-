import axios from 'axios'



//Get task on board 
export const getTask =async ()=>{
  try {
    const res = await axios.get(`${import.meta.env.VITE_SOME_KEY}/task/gettask`,
      {
        headers:{
           Authorization: `${localStorage.getItem("token")}`
        }
      }
    )
    return res 
  } catch (error) {
    return error
  }
   
}


//Task create on save button click 
export const CreateTask =async (data)=>{
     const res = await axios.post(`${import.meta.env.VITE_SOME_KEY}/task/create`,data,{
      headers:{
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
     })
     return res
}


export const updateTaskType = async (taskId,tasktype)=>{
  try {
    const res = await axios.put(`${import.meta.env.VITE_SOME_KEY}/task/update/${taskId}`,{tasktype:tasktype})
    return res
  } catch (error) {
     return error
  }
     
}


export const DeleteTask = async (id)=>{
   try {
    const res = await axios.delete(`${import.meta.env.VITE_SOME_KEY}/task/delete/${id}`)
    return res
   } catch (error) {
      return error
   }
   
}

export const getTaskbyId =async (id)=>{
   try {
    const res = await axios.get(`${import.meta.env.VITE_SOME_KEY}/task/viewtask/${id}`)
    return res
   } catch (error) {
      return error
   }
}


export const getTasktypeCount =async()=>{
  try {
    const res = await axios.get(`${import.meta.env.VITE_SOME_KEY}/task/tastypecount`,{
      headers:{
         Authorization: `${localStorage.getItem("token")}`
      }
    });
    return res
  } catch (error) {
    return error 
  }
}


export const getPriorityCount =async()=>{
  try {
    const res = await axios.get(`${import.meta.env.VITE_SOME_KEY}/task/prioritytype`,{
      headers:{
         Authorization: `${localStorage.getItem("token")}`
      }
    });
    return res
  } catch (error) {
    return error 
  }
}


export const updateTask =async (taskId,data)=>{
    try {
      const res = await axios.put(`${import.meta.env.VITE_SOME_KEY}/task/update/${taskId}`,data,{
        headers:{
           "Content-Type": "application/json"
        }
      })
      return res 
    } catch (error) {
       return error
    }
}


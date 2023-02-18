import axios from "axios";
import Task from "../types/Task";
export const getAllTasks = async () => {
  const { data } = await axios
    .get("http://127.0.0.1:3004")
    .then((data) => data);

  return data;
};

export const updateTask = async (
  id: string,
  updatedTask: { [k: string]: string | boolean }
) => {
  axios.patch(`http://127.0.0.1:3004/tasks/${id}`, updatedTask).catch((err) => {
    if (err) {
      console.log("Failed to update the record");
    }
  });
};

export const addTask = async (text:string)=>{
    const {data} =  await axios.post("http://127.0.0.1:3004/tasks", {content:text, complited:false}).then(data=>data)
    return data
}
export const deleteTask = async (id:string)=>{
    const data =  await axios.delete(`http://127.0.0.1:3004/tasks/${id}`).then(data=>data)
    return data
}
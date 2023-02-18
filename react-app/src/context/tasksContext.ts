import { createContext, useContext } from "react";
import Task from "../types/Task";
type TasksContextType = {
  tasks?: Task[];
  setTasks?: Function;
};

export const TasksContext = createContext<TasksContextType>({});

export const useTasksContext = () => {
  const { tasks, setTasks } = useContext(TasksContext);

  if (!tasks) {
    throw Error("tasks are mandatory in TasksContext");
  }
  if (!setTasks) {
    throw Error("setTasks function is mandatory in TasksContext");
  }

  return { tasks, setTasks };
};

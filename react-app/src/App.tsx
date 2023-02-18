import { TasksContext } from "./context/tasksContext";
import { getAllTasks } from "./api/requests";
import { useQuery } from "@tanstack/react-query";
import Task from "./types/Task";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import ToDoList from "./components/LoadingSpinner/ToDoList/ToDoList";
import "./App.scss";
import { useEffect, useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { data, isLoading } = useQuery<Task[]>(["posts"], getAllTasks);

  useEffect(() => {
    setTasks(data!);
  }, [data]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!data) {
    return <h1>something went wrong</h1>;
  }

  return (
    <TasksContext.Provider
      value={{
        tasks: tasks || data,
        setTasks,
      }}
    >
      <ToDoList />
    </TasksContext.Provider>
  );
};

export default App;

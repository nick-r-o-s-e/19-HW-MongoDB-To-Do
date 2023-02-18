import { useState } from "react";
import { useTasksContext } from "../../../context/tasksContext";
import "./ToDoList.scss";
import { updateTask, addTask, deleteTask } from "../../../api/requests";

function ToDoList() {
  const { tasks, setTasks } = useTasksContext();
  const [newTask, setNewTask] = useState("");

  const handleCheck = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task._id == id) {
          updateTask(id, { complited: !task.complited });

          return { ...task, complited: !task.complited };
        }

        return task;
      })
    );
  };

  const handleSubmitTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTask(newTask).then((data) => {
      setTasks([...tasks, data]);
      setNewTask("");
    });
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id)
      .then(() => {
        setTasks([...tasks].filter((task) => task._id != id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="page-container">
      <div className="list-wrapper">
        <h1>To Do List</h1>

        <div className="list">
          <form
            method="post"
            className="add-task"
            onSubmit={(e) => {
              handleSubmitTask(e);
            }}
          >
            <div className="input-group mb-3">
              <input
                value={newTask}
                name="text"
                type="text"
                className="form-control"
                placeholder="New Task"
                aria-label="New Task"
                onChange={(e) => {
                  setNewTask(e.currentTarget.value);
                }}
              />

              <button type="submit" className="btn btn-secondary">
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </form>
          <div className="tasks">
            {tasks.map((task) => {
              return (
                <div key={task._id} className="task-div">
                  <div className="task-wrapper">
                    <div className="task">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        checked={task.complited}
                        onChange={(e) => {
                          handleCheck(task._id);
                        }}
                      />
                      <label
                        className={`form-check-label${
                          task.complited ? " complited" : ""
                        }`}
                        htmlFor="flexCheckDefault"
                      >
                        {task.content}
                      </label>
                    </div>

                    <button
                      onClick={() => {
                        handleDeleteTask(task._id);
                      }}
                      className="delete-task-btn"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>

                  <div className="time">
                    Created at{" "}
                    {task.createdAt
                      .split(".")[0]
                      .split("T")
                      .reverse()
                      .join(" (")}
                    )
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToDoList;

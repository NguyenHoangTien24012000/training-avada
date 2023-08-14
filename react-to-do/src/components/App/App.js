import React, { useEffect, useState } from "react";
import "./App.css";
import FormAddTask from "../FormAddTask/FormAddTask";
import { TasksList } from "../TasksList/TasksList";
import { TasksListComplete } from "../TasksList/TasksListComplete";
import * as taskApi from "../../utils/api/taskApi";

export default function App() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    taskApi.getAllTask((data) => {
        setTasks(data)
    });
  }, []);
  return (
    <div className="app">
      <h1 className="app-title">To Do App</h1>
      <div className="app-main">
        <div className="app-container">
          <div className="add-task">
            <FormAddTask props={[tasks, setTasks]}></FormAddTask>
          </div>
          <div className="todo-list">
            <div>
              <TasksList props={[tasks, setTasks]}></TasksList>
              <hr></hr>
              <TasksListComplete props={[tasks, setTasks]}></TasksListComplete>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import "./App.css";
import FormAddTask from "../FormAddTask/FormAddTask";
import { TasksList } from "../TasksList/TasksList";
import { TasksListComplete } from "../TasksList/TasksListComplete";
import { useStore } from "../../context/Task/index";
import { actions } from "../../Reducer/Tasks";
import * as taskApi from "../../utils/api/taskApi";

export default function App() {
  const [state, dispatch] = useStore();
  useEffect(() => {
    taskApi.getAllTask((data) => {
      dispatch(actions.getAllTask(data));
    });
  }, []);
  return (
    <div className="app">
      <h1 className="app-title">To Do App</h1>
      <div className="app-main">
        <div className="app-container">
          <div className="add-task">
            <FormAddTask></FormAddTask>
          </div>
          <div className="todo-list">
            <div>
              <TasksList></TasksList>
              <hr></hr>
              <TasksListComplete></TasksListComplete>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

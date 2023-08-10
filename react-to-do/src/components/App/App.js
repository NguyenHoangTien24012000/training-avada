import React, { useContext, useEffect, useReducer, useState } from "react";
import "./App.css";
import FormAddTask from "../Tasks/FormAddTask";
import { Tasks } from "../Tasks/Tasks";
import { TasksComplete } from "../Tasks/TaskComplete";

export default function App() {
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
              <Tasks></Tasks>
              <hr></hr>
              <TasksComplete></TasksComplete>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useRef } from "react";
import "./FormAddTask.css";
import { useStore } from "../../context/Task/index";
import { actions } from "../../Reducer/Tasks";
import * as taskApi from "../../utils/api/taskApi";

export default function FormAddTask() {
  const [task, setTask] = useState("");

  const [state, dispatch] = useStore();

  const [errorInput, setErrorInput] = useState(false);

  const inputRef = useRef(null);

  function handleChange(event) {
    if(event.target.value){
      setErrorInput(false);
    }else{
      setErrorInput(true);
    }
    setTask(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!task) {
      inputRef.current.focus();
      setErrorInput(true);
      return;
    }
    taskApi.addNewTask(task, ()=>{
      dispatch(actions.addTask(task));
    })
    setTask("");
    inputRef.current.focus();
  }

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <label className="task-new--text" htmlFor="new-task">
        New Task
      </label>
      <input
        ref={inputRef}
        type="text"
        value={task}
        className="input-new-task"
        onChange={handleChange}></input>
      <button type="submit" className="button-add-task">
        Add
      </button>
      {errorInput ? <p className="text-error">Invalid Input</p> : ""}
    </form>
  );
}

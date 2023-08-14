import React, { useState, useRef } from "react";
import "./FormAddTask.css";
import * as taskApi from "../../utils/api/taskApi";

export default function FormAddTask({ props }) {
  const [tasks, setTasks] = props;

  const [nameTask, setNameTask] = useState("");

  const [errorInput, setErrorInput] = useState(false);

  const inputRef = useRef(null);

  function handleChange(event) {
    if (event.target.value.trim()) {
      setErrorInput(false);
    } else {
      setErrorInput(true);
    }
    setNameTask(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (errorInput) {
      inputRef.current.focus();
      return;
    }
    const lengthId = 10;
    const id = Math.random()
      .toString(36)
      .substring(2, lengthId + 2);
    const newTask = { id, name: nameTask, isCompleted: false };
    taskApi.addNewTask({task: newTask}, () => {
      setTasks([...tasks, newTask]);
    });
    setNameTask("");
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
        value={nameTask}
        className="input-new-task"
        onChange={handleChange}></input>
      <button type="submit" className="button-add-task">
        Add
      </button>
      {errorInput ? <p className="text-error">Invalid Input</p> : ""}
    </form>
  );
}

import React from "react";
import "./Task.css";
import * as taskApi from '../../utils/api/taskApi';
import { useStore } from "../../context/Task";
import { actions } from "../../Reducer/Tasks";

export default function Task({props}) {
    const {
        task,
        statusListTaskCurrent,
        checkInput,
        setCheckInput
      } = props

    const [ state,dispatch] = useStore();

  function handleChangeInput(e) {
    const id = parseInt(e.target.value);
    setCheckInput((prev) => {
      if (checkInput.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  }

  function changeStatusTask(id) {
    taskApi.changeStatusTask(id, ()=>{
        console.log("-------", id)
      dispatch(actions.changeStatusTask(id));
    })
  }

  function deleteTask(id) {
    taskApi.deleteTask(id, ()=>{
      dispatch(actions.deleteTask(id));
    })
  }

  return (
    <div key={task.id}>
      <div
        className={
          statusListTaskCurrent ? "todo todo-success" : "todo todo-wait"
        }>
        <div className="content-todo-left">
          <input
            type="checkbox"
            value={task?.id}
            checked={checkInput.includes(task.id)}
            onChange={(e) => handleChangeInput(e)}></input>
          <label htmlFor="" className="todo-content">
            {task?.name}
          </label>
        </div>
        <div className="content-todo-right">
          <button
            className="btn-complete"
            onClick={() => changeStatusTask(task.id)}>
            {statusListTaskCurrent ? "UnComplete" : "Complete"}
          </button>
          <button className="btn-delete" onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

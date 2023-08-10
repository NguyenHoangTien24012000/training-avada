import React, { useState } from "react";
import { useStore } from "../../store/Task";
import { actions } from "../../Reducer/Tasks";

export function HocComponentTaskList(WrappedComponent, statusListTaskCurrent) {
  const TaskList = (props) => {
    const [state, dispatch] = useStore();

    const [checkInput, setCheckInput] = useState([]);

    function handleSubmit(event) {
      event.preventDefault();
    }

    function changeStatusTask(id, isCompleted) {
      dispatch(actions.changeStatusTask(id, isCompleted));
    }

    function deleteTask(id) {
      dispatch(actions.deleteTask(id));
    }

    function handleChangeInput(e) {
      const id = parseInt(e.target.value);
      setCheckInput((prev) => {
        if (checkInput.includes(id)) {
          return prev.filter((item) => item !== id);
        }
        return [...prev, id];
      });
    }

    function submitChangeStatusMultiTask() {
      const statusCurrent = statusListTaskCurrent;
      dispatch(actions.changeStatusMultiTask(checkInput, statusCurrent));
      setCheckInput([]);
    }

    function submitDeleteStatusMultiTask(){
      dispatch(actions.deleteMultiTask(checkInput));
      setCheckInput([]);
    }

    const listTask = state.filter((task) => task.isCompleted === statusListTaskCurrent);

    function renderTasks() {
      return listTask.map((task, index) => {
        return (
          <div key={index}>
            <div className={statusListTaskCurrent ? "todo todo-success" : "todo todo-wait" }>
              <div className="content-todo-left">
                <input
                  type="checkbox"
                  value={task.id}
                  checked={checkInput.includes(task.id)}
                  onChange={(e) => handleChangeInput(e)}></input>
                <label htmlFor="" className="todo-content">
                  {task.name}
                </label>
              </div>
              <div className="content-todo-right">
                <button
                  className="btn-complete"
                  onClick={() => changeStatusTask(task.id, task.isCompleted)}>
                  {statusListTaskCurrent ? "UnComplete" : "Complete"}
                </button>
                <button
                  className="btn-delete"
                  onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      });
    }

    return (
      <>
        <WrappedComponent {...props}></WrappedComponent>
        <form onSubmit={handleSubmit}>
          <div className="task-list">
            {listTask.length === 0 ? (
              <p className="text-empty">Task list empty...</p>
            ) : (
              renderTasks()
            )}
          </div>
          {checkInput.length === 0 ? (
            <div className="btn-group">
              <button
                type="submit"
                className="btn-complete-selected btn-selected"
                style={{ cursor: "not-allowed" }}
                disabled>
                 {statusListTaskCurrent ? "Uncomplete selected" : "Complete selected"}
              </button>
              <button
                type="submit"
                className="btn-delete-selected btn-selected"
                style={{ cursor: "not-allowed" }}
                disabled>
                Delete selected
              </button>
            </div>
          ) : (
            <div className="btn-group">
              <button
                type="submit"
                className="btn-complete-selected btn-selected"
                onClick={() => submitChangeStatusMultiTask()}>
                {statusListTaskCurrent ? "Uncomplete selected" : "Complete selected"}
              </button>
              <button
                type="submit"
                className="btn-delete-selected btn-selected"
                onClick={() => submitDeleteStatusMultiTask()}>
                Delete selected
              </button>
            </div>
          )}
        </form>
      </>
    );
  };
  return TaskList;
}

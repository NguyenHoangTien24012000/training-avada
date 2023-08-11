import React, { useState } from "react";
import { useStore } from "../../context/Task/index";
import { actions } from "../../Reducer/Tasks";
import * as taskApi from "../api/taskApi";
import Task from "../../components/Task/Task";

export function HocComponentTaskList(WrappedComponent, statusListTaskCurrent) {
  const TaskList = (props) => {
    const [state, dispatch] = useStore();

    const [checkInput, setCheckInput] = useState([]);

    function handleSubmit(event) {
      event.preventDefault();
    }

    function submitChangeStatusMultiTask() {
      const statusCurrent = statusListTaskCurrent;
      taskApi.changeMultipleTask(checkInput, statusCurrent, () => {
        dispatch(actions.changeStatusMultiTask(checkInput, statusCurrent));
        setCheckInput([]);
      });
    }

    function submitDeleteStatusMultiTask() {
      taskApi.deleteMultipleTask(checkInput, () => {
        dispatch(actions.deleteMultiTask(checkInput));
        setCheckInput([]);
      });
    }

    const listTask = state.filter(
      (task) => task.isCompleted === statusListTaskCurrent
    );

    function renderTasks() {
      return listTask.map((task, index) => {
        return (
          <Task key={index}
            props={{
              task,
              statusListTaskCurrent,
              checkInput,
              setCheckInput,
            }}></Task>
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
                {statusListTaskCurrent
                  ? "Uncomplete selected"
                  : "Complete selected"}
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
                {statusListTaskCurrent
                  ? "Uncomplete selected"
                  : "Complete selected"}
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

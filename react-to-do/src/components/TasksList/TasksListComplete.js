import React from "react";
import "./TaskList.css";
import { HocComponentTaskList } from "../../utils/HOCs/HocComponentTaskList";

function tasksListComplete(props) {
  return (
    <>
      <h3 className="title-list">Tasks complete</h3>
    </>
  );
}
const statusListTaskCurrent = true;
export const TasksListComplete = HocComponentTaskList(
  tasksListComplete,
  statusListTaskCurrent
);

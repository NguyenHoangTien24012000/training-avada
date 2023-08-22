import React from "react";
import "./TaskList.css";
import { HocComponentTaskList } from "../../utils/HOCs/HocComponentTaskList";

function tasksListComplete(props) {
  return <h1 className="title-list">Tasks done</h1>;
}
const statusListTaskCurrent = true;
export const TasksListCompleteNew = HocComponentTaskList(
    tasksListComplete,
  statusListTaskCurrent
);
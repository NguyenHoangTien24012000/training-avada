import React from "react";
import "./TaskList.css";
import { HocComponentTaskList } from "../../utils/HOCs/HocComponentTaskList";

function tasksList(props) {
  return <h1 className="title-list">Tasks</h1>;
}
const statusListTaskCurrent = false;
export const TasksList = HocComponentTaskList(
  tasksList,
  statusListTaskCurrent
);

import React from "react";
import "./TaskList.css";
import { HocComponentTaskList } from "../../utils/HOCs/HocComponentTaskList";

function tasksList(props) {
  return (
    <>
      <h3 className="title-list">Tasks</h3>
    </>
  );
}
const statusListTaskCurrent = false;
export const TasksList = HocComponentTaskList(tasksList, statusListTaskCurrent);

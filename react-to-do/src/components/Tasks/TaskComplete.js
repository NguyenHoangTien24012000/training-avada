import React from "react";
import { HocComponentTaskList } from "../HocComponent/HocComponentTaskList";

function tasksComplete(props) {
  return (
    <>
         <h3 className="title-list">Tasks complete</h3>
    </>
  );
}
const statusListTaskCurrent = true;
export const TasksComplete = HocComponentTaskList(tasksComplete, statusListTaskCurrent);

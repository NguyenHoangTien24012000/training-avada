import React from "react";
import { HocComponentTaskList } from "../HocComponent/HocComponentTaskList";

function tasks(props) {
  return (
    <>
      <h3 className="title-list">Tasks</h3>
    </>
  );
}

export const Tasks = HocComponentTaskList(tasks, false);

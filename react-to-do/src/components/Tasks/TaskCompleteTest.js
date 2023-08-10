import React from "react";
import { HocComponentTaskList } from "../HocComponent/HocComponentTaskList";

function TaskCompleteTest(props) {
//   console.log(props);
  return (
    <>
         <h3 className="title-list">Tasks complete</h3>
    </>
  );
}

export const TaskCompleteTest1 = HocComponentTaskList(TaskCompleteTest, true);

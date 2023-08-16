import React from "react";
import "./TaskList.css";
import { HocComponentTaskList } from "../../utils/HOCs/HocComponentTaskList";
import { Page } from "@shopify/polaris";

function tasksList(props) {
  return <h1 className="title-list">Tasks</h1>;
}
const statusListTaskCurrent = false;
export const TasksListNew = HocComponentTaskList(
  tasksList,
  statusListTaskCurrent
);

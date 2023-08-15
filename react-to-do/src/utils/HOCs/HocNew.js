import React, { useState } from "react";
import * as taskApi from "../api/taskApi";
import { Card, ResourceList } from "@shopify/polaris";
import TaskNew from "../../components/Task/TaskNew";
import { TasksListEmpty } from "../../components/TasksList/TasksListEmpty";

export function HocComponentTaskList(WrappedComponent, statusListTaskCurrent) {
  const TaskList = ({ props }) => {
    const [tasks, setTasks] = props;

    const [selectedTasks, setSelectedTasks] = useState([]);

    const resourceName = {
      singular: "task",
      plural: "tasks",
    };

    function renderItem(task) {
      const { id, name, isCompleted } = task;

      return (
        <TaskNew
          props={{
            id,
            name,
            isCompleted,
            statusListTaskCurrent,
            setTasks,
          }}></TaskNew>
      );
    }

    const listTasks = [
      {
        content: statusListTaskCurrent ? "Undo tasks" : "Complete tasks",
        onAction: () => {
          const statusCurrent = statusListTaskCurrent;
          taskApi.changeMultipleTask(selectedTasks, statusCurrent, (data) => {
            setTasks((prevTasks) =>
              prevTasks.map((task) =>
                selectedTasks.includes(task.id)
                  ? { ...task, isCompleted: !statusCurrent }
                  : task
              )
            );
            setSelectedTasks([]);
          });
        },
      },
      {
        content: "Delete tasks",
        onAction: () => {
          taskApi.deleteMultipleTask(selectedTasks, () => {
            setTasks((prevTasks) =>
              prevTasks.filter((task) => !selectedTasks.includes(task.id))
            );
            setSelectedTasks([]);
          });
        },
      },
    ];

    const tasksFilter = tasks.filter(
      (task) => task.isCompleted === statusListTaskCurrent
    );

    return (
      <Card>
        <WrappedComponent {...props} />
        {tasksFilter.length === 0 ? (
          <TasksListEmpty />
        ) : (
          <ResourceList
            resourceName={resourceName}
            items={tasksFilter}
            renderItem={renderItem}
            selectedItems={selectedTasks}
            onSelectionChange={setSelectedTasks}
            promotedBulkActions={listTasks}
          />
        )}
      </Card>
    );
  };
  return TaskList;
}

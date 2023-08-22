import React, { useState } from "react";
import { Card, ResourceItem, ResourceList } from "@shopify/polaris";
import Task from "../../components/Task/Task";
import { TasksListEmpty } from "../../components/TasksList/TasksListEmpty";
import { useFetchDelete } from "../../hooks/useFetchDelete";
import { BASE_URL } from "../../config/constantsApi";
import { useFetchPut } from "../../hooks/useFetchPut";


export function HocComponentTaskList(WrappedComponent, statusCurrent) {
  const TaskList = (props) => {
    const { tasks, setTasks, getting } = props;

    // console.log("Getting", getting)

    const [selectedTasks, setSelectedTasks] = useState([]);

    const { putting, handleUpdate } = useFetchPut(
      BASE_URL + "/tasks"
    );
    const { deleting, handleDelete } = useFetchDelete(
      BASE_URL + "/tasks"
    );

    const resourceName = <div>test</div>;

    function renderItem(task) {
      const { id, name, isCompleted } = task;

      return (
        <ResourceItem id={id} key={id}>
          <Task
            id={id}
            name={name}
            isCompleted={isCompleted}
            setTasks={setTasks}></Task>
        </ResourceItem>
      );
    }
    const updateSuccess = () => {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          selectedTasks.includes(task.id)
            ? { ...task, isCompleted: !statusCurrent }
            : task
        )
      );
      setSelectedTasks([]);
    };

    const changeMultipleTask = () => {
      const data = { arrId: selectedTasks, statusCurrent };
      handleUpdate({ data, updateSuccess });
    };

    const deleteSuccess = () => {
      setTasks(prevTasks => {
        return prevTasks.filter(task => !selectedTasks.includes(task.id));
      });
      setSelectedTasks([]);
    };

    const deleteMultipleTask = () => {
      const data = { arrId: selectedTasks };
      handleDelete({ data, deleteSuccess });
    };
    
    const listActions = [
      {
        content: selectedTasks.length + " Selected",
        disabled : true
      },
      {
        content: statusCurrent ? "Undo tasks" : "Complete tasks",
        onAction: changeMultipleTask,
      },
      {
        content: "Delete tasks",
        onAction: deleteMultipleTask,
      }
    ];

    const tasksFilter = tasks.filter(
      task => task.isCompleted === statusCurrent
    );

    return (
      <Card>
        <WrappedComponent {...props} />
        {tasksFilter.length === 0 ? (
          <TasksListEmpty />
        ) : (
          <ResourceList
            loading={putting || deleting}
            resourceName={resourceName}
            items={tasksFilter}
            renderItem={renderItem}
            selectedItems={selectedTasks}
            onSelectionChange={setSelectedTasks}
            promotedBulkActions={listActions}
          />
        )}
      </Card>
    );
  };
  return TaskList;
}

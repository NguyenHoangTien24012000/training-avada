import {
  Badge,
  Button,
  ButtonGroup,
  ResourceItem,
  Stack,
  TextStyle,
} from "@shopify/polaris";
import React, { useState } from "react";
import * as taskApi from "../../utils/api/taskApi";

export default function TaskNew({ props }) {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const { id, name, isCompleted, statusListTaskCurrent, setTasks } = props;

  function changeStatusTask(id) {
    setLoadingComplete(true);
    taskApi.changeStatusTask(id, (data) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, isCompleted: !statusListTaskCurrent }
            : task
        )
      );
      setLoadingComplete(false);
    });
  }

  function deleteTask(id) {
    setLoadingDelete(true);
    taskApi.deleteTask(id, () => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setLoadingDelete(false);
    });
  }

  return (
      <ResourceItem id={id} key={id}>
        <Stack distribution="equalSpacing">
          <TextStyle>{name}</TextStyle>
          <ButtonGroup>
            {statusListTaskCurrent ? (
              <Badge status="success">Done </Badge>
            ) : (
              <Badge status="new">Pending</Badge>
            )}
            <Button
              onClick={() => changeStatusTask(id)}
              loading={loadingComplete}>
              {isCompleted ? "Undo" : "Complete"}
            </Button>
            <Button
              destructive
              onClick={() => {
                deleteTask(id);
              }}
              loading={loadingDelete}>
              Delete
            </Button>
          </ButtonGroup>
        </Stack>
      </ResourceItem>
  );
}

import {
  Badge,
  Button,
  ButtonGroup,
  ResourceItem,
  Stack,
  TextStyle,
} from "@shopify/polaris";
import React from "react";
import { useFetchPut } from "../../hooks/useFetchPut";
import { BASE_URL } from "../../config/constantsApi";
import { useFetchDelete } from "../../hooks/useFetchDelete";

export default function Task(props) {
  const { id, name, isCompleted, setTasks } = props;

  const { putting, handleUpdate } = useFetchPut(BASE_URL + `/task/${id}`);

  const { deleting, handleDelete } = useFetchDelete(BASE_URL + `/task/${id}`);

  const updateSuccess = () => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !isCompleted } : task
      )
    );
  };

  async function changeStatusTask() {
    await handleUpdate({ updateSuccess });
  }

  const deleteSuccess = () => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const deleteTask = async () => {
    await handleDelete({ deleteSuccess });
  };

  return (
    <Stack distribution="equalSpacing">
      <TextStyle>{name}</TextStyle>
      <ButtonGroup>
        {isCompleted ? (
          <Badge status="success">Done </Badge>
        ) : (
          <Badge status="new">Pending</Badge>
        )}
        <Button onClick={() => changeStatusTask()} loading={putting}>
          {isCompleted ? "Undo" : "Complete"}
        </Button>
        <Button
          destructive
          onClick={() => {
            deleteTask();
          }}
          loading={deleting}>
          Delete
        </Button>
      </ButtonGroup>
    </Stack>
  );
}

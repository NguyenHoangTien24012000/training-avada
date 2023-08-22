import { Form, FormLayout, Modal, Stack, TextField } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { BASE_URL } from "../../config/constantsApi";
import { useFetchPost } from "../../hooks/useFetchPost";

export default function FormAddTask(props) {
  const [task, setTask] = useState("");
  const [error, setError] = useState("");
  const { tasks, setTasks } = props;
  const { openForm, setOpenForm } = props;
  const { creating, handleCreate } = useFetchPost(BASE_URL + "/task");

  const handleOpen = () => {
    setOpenForm(!openForm);
  };

  const handleSubmit = async () => {
    if (!task.trim()) {
      setError("Invalid input!!");
      return;
    }
    const createSuccess = newTask => {
      setTasks([...tasks, newTask]);
      setOpenForm(false);
      setTask("");
    };
    const newTask = { task };
    await handleCreate({ data: newTask, createSuccess });
  };

  const handleInput = useCallback(value => {
    setTask(value);
    if (!value.trim()) {
      setError("Invalid input!!");
      return;
    }
    setError("");
  }, []);

  const modal = (
    <div>
      <Form noValidate={false} onSubmit={handleSubmit}>
        <Modal
          open={openForm}
          onClose={handleOpen}
          title="Create a new todo"
          primaryAction={{
            content: "Create",
            onAction: handleSubmit,
            loading: creating,
          }}
          secondaryActions={[
            {
              content: "Cancel",
              onAction: handleOpen,
            },
          ]}
        >
          <Modal.Section>
            <FormLayout>
              <TextField
                value={task}
                onChange={handleInput}
                type="text"
                error={error}
                selectTextOnFocus={true}
              />
            </FormLayout>
          </Modal.Section>
        </Modal>
      </Form>
    </div>
  );
  return <Stack>{modal}</Stack>;
}

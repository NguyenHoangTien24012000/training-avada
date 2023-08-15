import {
  Button,
  Form,
  FormLayout,
  Modal,
  Page,
  TextField,
} from "@shopify/polaris";
import React, { useCallback, useRef, useState } from "react";
import * as taskApi from "../../utils/api/taskApi";

export default function AddTask({ props }) {
  const [open, setOpen] = useState(false);

  const [task, setTask] = useState("");

  const [error, setError] = useState("")

  const [tasks, setTasks] = props;

  const inputRef = useRef(null);

  const handleOpen = useCallback(() => {
    if(open){
      // inputRef.current.focus();
    }
    setOpen(!open);
  }, [open]);

  const handleSubmit = useCallback((e) => {
    if(!task.trim()){
        setError("Invalid input!!");
        return
    }
    const lengthId = 10;
    const id = Math.random()
      .toString(36)
      .substring(2, lengthId + 2);
    const newTask = { id, name: task, isCompleted: false };
    taskApi.addNewTask({task:newTask}, ()=>{
      setTasks([...tasks, newTask]);
      setOpen(false);
      setTask("");
    })

  });

  const handleInput = useCallback((value) => {
    setTask(value);
    if(!value.trim()){
        setError("Invalid input!!")
        return;
    }
    setError("");
  }, []);

  const activator = (
    <Button primary onClick={handleOpen}>
      Create todo
    </Button>
  );

  const modal = (
    <div>
      <Form noValidate={false} onSubmit={handleSubmit}>
        <Modal
          activator={activator}
          open={open}
          onClose={handleOpen}
          title="Create a new todo"
          primaryAction={{
            content: "Create",
            onAction: handleSubmit,
          }}
          secondaryActions={[
            {
              content: "Cancel",
              onAction: handleOpen,
            },
          ]}>
          <Modal.Section>
            <FormLayout>
              <TextField value={task} onChange={handleInput} type="text" error={error} selectTextOnFocus={true}/>
            </FormLayout>
          </Modal.Section>
        </Modal>
      </Form>
    </div>
  );

  return <Page fullWidth={false} title="To Do List" primaryAction={modal} />;
}

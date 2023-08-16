import {
  Button,
  Form,
  FormLayout,
  Modal,
  Page,
  TextField,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import * as taskApi from "../../utils/api/taskApi";

export default function AddTask({ props }) {
  const [open, setOpen] = useState(false);

  const [task, setTask] = useState("");

  const [error, setError] = useState("");

  const [tasks, setTasks] = props;

  //@hoangtien chỗ này để deps là open đang bị chạy lại callback liên tục
  const handleOpen = useCallback(() => {
    if (open) {
      // inputRef.current.focus();
    }
    setOpen(!open);
  }, [open]);

  //@hoangtien chỗ này k cần thiết phải usecallback đâu mình để hàm handleSubmit bt cũng đc mà. Nhớ async await
  const handleSubmit = useCallback(e => {
    if (!task.trim()) {
      setError("Invalid input!!");
      return;
    }
    const lengthId = 10;
    const id = Math.random()
      .toString(36)
      .substring(2, lengthId + 2);
    const newTask = { id, name: task, isCompleted: false };

    //@hoangtien những đoạn call api nên viết thành 1 hook riêng useCreateApi,useDelete... VD:https://i.imgur.com/K4TauXO.png
    taskApi.addNewTask({ task: newTask }, () => {
      setTasks([...tasks, newTask]);
      setOpen(false);
      setTask("");
    });
  });

  const handleInput = useCallback(value => {
    setTask(value);
    if (!value.trim()) {
      setError("Invalid input!!");
      return;
    }
    setError("");
  }, []);

  //@hoangtien trong luc create thì cho nút này loading nha
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
  //@hoangtien trong trang thì chỉ có 1 thẻ page thôi nha. Cái này sử dụng <Stack/> thì hợp lý hơn
  //@hoangtien modal này sử dụng chỉ cần {modal} https://i.imgur.com/7N8iLl5.png
  return <Page fullWidth={false} title="To Do List" primaryAction={modal} />;
}

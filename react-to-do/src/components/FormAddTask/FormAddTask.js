import {
  Form,
  FormLayout,
  Modal,
  Stack,
  TextField,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import {BASE_URL}from "../../config/constantsApi"
import { useFetchPost } from "../../hooks/useFetchPost";

export default function FormAddTask(props) {

  const [task, setTask] = useState("");

  const [error, setError] = useState("");

  const { tasks, setTasks } = props;

  const { openForm, setOpenForm } = props;


  const {creating, handleCreate} = useFetchPost(BASE_URL + '/task');

  //@hoangtien chỗ này để deps là open đang bị chạy lại callback liên tục
  const handleOpen = () => {
    setOpenForm(!openForm);
  };

  //@hoangtien chỗ này k cần thiết phải usecallback đâu mình để hàm handleSubmit bt cũng đc mà. Nhớ async await
  const handleSubmit = async () => {
    if (!task.trim()) {
      setError("Invalid input!!");
      return;
    }
    //@hoangtien những đoạn call api nên viết thành 1 hook riêng useCreateApi,useDelete... VD:https://i.imgur.com/K4TauXO.png
    const createSuccess = (newTask)=>{
      setTasks([...tasks, newTask]);
      setOpenForm(false);
      setTask("");
    }

    const newTask = {task}
    await handleCreate({data:newTask, createSuccess});
  };

  const handleInput = useCallback((value) => {
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
            loading : creating
          }}
          secondaryActions={[
            {
              content: "Cancel",
              onAction: handleOpen,
            },
          ]}>
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
  return <Stack fullWidth={false}>{modal}</Stack>;
}

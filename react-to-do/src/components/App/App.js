import { Layout, Page, Card, Button } from "@shopify/polaris";
import React, { useState } from "react";
import FormAddTask from "../FormAddTask/FormAddTask";
import { TasksListNew } from "../TasksList/TasksListNew";
import { TasksListCompleteNew } from "../TasksList/TasksListCompleteNew";

export default function App({ tasks, setTasks }) {
  const [openForm, setOpenForm] = useState(false);
  //@hoangtien 2 cái này https://i.imgur.com/ilemWGy.png mình thấy nó giống nhau có thể sử dụng chung HocComponentTaskList luôn chỉ cần truyền prop khác thôi ý k cần ntn đâu.
  // <Card/> cũng có title k cần h1 đâu b. Project của mình khuyển khích dùng component của polaris
  // Với xóa mấy cái import k dùng b xóa đi nhá
  return (
    <Page
      title="Todo list"
      primaryAction={
        <Button primary onClick={() => setOpenForm(true)}>
          Add Task
        </Button>
      }
    >
      <Card sectioned>
        <FormAddTask
          openForm={openForm}
          setOpenForm={setOpenForm}
          tasks={tasks}
          setTasks={setTasks}
        />
        <TasksListNew tasks={tasks} setTasks={setTasks} />
        <TasksListCompleteNew tasks={tasks} setTasks={setTasks} />
      </Card>
    </Page>
  );
}

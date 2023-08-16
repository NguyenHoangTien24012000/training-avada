import { Layout, Page, Card, Button } from "@shopify/polaris";
import React, { useState } from "react";
import FormAddTask from "../FormAddTask/FormAddTask";
import { TasksListNew } from "../TasksList/TasksListNew";
import { TasksListCompleteNew } from "../TasksList/TasksListCompleteNew";

export default function App(props) {
  //@hoangtien các biến k sử dụng xóa đi nha
  ///@hoangtien nên truyền props ntn tasks={tasks} setTasks={setTasks}
  const [openForm, setOpenForm] = useState(false);
  const { tasks, setTasks } = props;
  return (
    <Page
      title="Todo list"
      primaryAction={
        <Button primary onClick={() => setOpenForm(true)}>
          Add Task
        </Button>
      }>
      <Layout>
        <Layout.Section>
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
        </Layout.Section>
      </Layout>
    </Page>
  );
}

import { Page, Card, Button, Spinner, Stack } from "@shopify/polaris";
import React, { useState } from "react";
import FormAddTask from "../FormAddTask/FormAddTask";
import { TasksList } from "../TasksList/TasksList";
import { TasksListCompleteNew } from "../TasksList/TasksListCompleteNew";

export default function App(props) {
  const [openForm, setOpenForm] = useState(false);
  const { tasks, setTasks, getting } = props;
  return (
    <Page
      title="Todo list"
      primaryAction={
        <Button primary onClick={() => setOpenForm(true)}>
          Add Task
        </Button>
      }>
      {getting ? (
        <Stack distribution="fill" alignment="center">
          <Spinner
            accessibilityLabel="Spinner example"
            size="large"
            hasFocusableParent={true}></Spinner>
        </Stack>
      ) : (
        <Card sectioned>
          <FormAddTask
            openForm={openForm}
            setOpenForm={setOpenForm}
            tasks={tasks}
            setTasks={setTasks}
          />
          <TasksList tasks={tasks} setTasks={setTasks} getting={getting} />
          <TasksListCompleteNew
            tasks={tasks}
            setTasks={setTasks}
            getting={getting}
          />
        </Card>
      )}
    </Page>
  );
}

import { Button, Layout, Page, PageActions, Card, TextStyle } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import AddTask from "../FormAddTask/AddTask";
import { TasksListNew } from "../TasksList/TasksListNew";
import * as taskApi from "../../utils/api/taskApi";
import { TasksListCompleteNew } from "../TasksList/TasksListCompleteNew";

export default function AppMain() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    taskApi.getAllTask((data) => {
        setTasks(data)
    });
  }, []);

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <AddTask props={[tasks, setTasks]} />
            <TasksListNew props={[tasks, setTasks]}/>
           
            <TasksListCompleteNew props={[tasks, setTasks]}/>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

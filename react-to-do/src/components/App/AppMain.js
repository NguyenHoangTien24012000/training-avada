import { Layout, Page, Card } from "@shopify/polaris";
import React from "react";
import AddTask from "../FormAddTask/AddTask";
import { TasksListNew } from "../TasksList/TasksListNew";
import * as taskApi from "../../utils/api/taskApi";
import { TasksListCompleteNew } from "../TasksList/TasksListCompleteNew";
import useFetchToDo from "../../hooks/useFetchToDo";

export default function AppMain() {

  const [tasks, setTasks, loading] = useFetchToDo();

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

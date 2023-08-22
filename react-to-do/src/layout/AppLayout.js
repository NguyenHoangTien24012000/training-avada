import { Frame, TopBar } from "@shopify/polaris";
import React from "react";
import AppMain from "../components/App/App";
import { useFetchGet } from "../hooks/useFetchGet";
import { BASE_URL } from "../config/constantsApi";

export default function AppLayout() {
  const userMenuMarkup = (
    <TopBar.UserMenu actions={[]} name="Dharma" detail={"Avada"} initials="A" />
  );
  const topBarMarkup = <TopBar userMenu={userMenuMarkup} />;

  const {data, setData, getting} = useFetchGet(BASE_URL + '/tasks');

  return (
    <Frame topBar={topBarMarkup}>
      <AppMain tasks={data} setTasks={setData} getting={getting}/>
    </Frame>
  );
}

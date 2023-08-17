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

  //@hoangtien cái useFetchGet nên cho vào bên trong Page. Nếu để ở đây mà có trang khác nữa thì khi vào trang đấy nó cũng call api
  const { data, setData } = useFetchGet(BASE_URL + "/tasks");

  return (
    <Frame topBar={topBarMarkup}>
      <AppMain tasks={data} setTasks={setData} />
    </Frame>
  );
}

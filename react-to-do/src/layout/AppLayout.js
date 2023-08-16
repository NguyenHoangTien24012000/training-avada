import { Frame, TopBar } from "@shopify/polaris";
import React from "react";
import AppMain from "../components/App/AppMain";

//@hoangtien chỗ này mình chưa có children nào thì xóa đi nha
export default function AppLayout({ children }) {
  const userMenuMarkup = (
    <TopBar.UserMenu actions={[]} name="Dharma" detail={"Avada"} initials="A" />
  );
  const topBarMarkup = <TopBar userMenu={userMenuMarkup} />;

  return (
    <Frame topBar={topBarMarkup}>
      <AppMain />
    </Frame>
  );
}

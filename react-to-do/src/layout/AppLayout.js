import { Frame, TopBar } from "@shopify/polaris";
import React from "react";
import AppMain from "../components/App/AppMain";

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

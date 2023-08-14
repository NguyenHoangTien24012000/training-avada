import {
  Button,
  Frame,
  TopBar,
  Page,
  Layout,
  Card,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import AppContainer from "../components/App/AppContainer";

export default function AppLayout({ children }) {
    
  const [userMenuActive, setUserMenuActive] = useState(false);

  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    []
  );

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[]}
      name="Dharma"
      detail={"Avada"}
      initials="A"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );
  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  return (
    <Frame topBar={topBarMarkup}>
        <AppContainer/>
    </Frame>
  );
}

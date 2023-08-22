import { AppProvider } from "@shopify/polaris";
import React from "react";
import "@shopify/polaris/dist/styles.css";
import AppLayout from "./layout/AppLayout";

export default function App() {
  return (
    <AppProvider
      theme={{
        logo: {
          width: 105,
          topBarSource: "https://cdn1.avada.io/logo/avada_logo_final_color.png",
          url: "/",
          accessibilityLabel: "AVADA",
        },
      }}
    >
      <AppLayout></AppLayout>
    </AppProvider>
  );
}

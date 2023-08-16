import { AppProvider } from "@shopify/polaris";
import React from "react";
import "@shopify/polaris/dist/styles.css";
import AppLayout from "./layout/AppLayout";

export default function App() {
  return (
    //@hoangtien b tìm hiểu xem AppProvider có những prop gì rồi sử dụng nhá
    <AppProvider>
      <AppLayout></AppLayout>
    </AppProvider>
  );
}

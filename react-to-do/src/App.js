import {
    AppProvider
  } from '@shopify/polaris';
  import React from 'react';
  import "@shopify/polaris/dist/styles.css";
import AppLayout from './layout/AppLayout';
  
  
export default function App() {
    return (
      <AppProvider>
            <AppLayout></AppLayout>
      </AppProvider>
    );
  }

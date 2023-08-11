import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import {TaskProvider} from './context/Task/index';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TaskProvider>
    <App />
  </TaskProvider>
);

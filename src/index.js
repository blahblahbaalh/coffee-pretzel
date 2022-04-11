import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import TodoContextProvider from './store/TodoContextProvider';
import UserContextProvider from './store/UserContextProvider';

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserContextProvider>
       <TodoContextProvider>
       <App />
      </TodoContextProvider>
    </UserContextProvider>
  </BrowserRouter>
);
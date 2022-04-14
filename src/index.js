import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import TodoContextProvider from './store/todo-context';
import UserContextProvider from './store/user-context';

/**
Navigating Around
1. index.js:
-- for main page files
-- for assets
2. xxList.js:
-- temporary mock datalist
3. xx-context.js
-- for useContext
4. use-xx.js
-- for custom hooks
5. xxLayout.js
-- for repeating patterns on pages
6. UI:
-- for smaller reuseable elements / components

 **/

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
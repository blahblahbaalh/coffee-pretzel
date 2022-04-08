import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthContextProvider from "./store/AuthContextProvider";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>
);
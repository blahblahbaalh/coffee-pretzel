import { Routes, Route, Navigate } from "react-router-dom";
import "./global.css";
import "./globalAnimation.css";
import Layout from "./components/Layout/Layout/Layout";
import CafePage from "./pages/Cafe";
import LandingPage from "./pages/Landing";
import NotFoundPage from "./pages/NotFound";
import RegisterPage from "./pages/Register";


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home/*" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cafe/:locationId" element={<CafePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;

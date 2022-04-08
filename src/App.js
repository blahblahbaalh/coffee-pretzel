import { Routes, Route, Navigate } from "react-router-dom";
import "./global.css";
import "./globalAnimation.css";
import Layout from "./components/Layout/Layout/Layout";
import CafePage from "./pages/CafePage";
import LandingPage from "./pages/LandingPage/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import PeopleForm from "./components/Form/PaperForm";
import PaperForm from "./components/Form/PaperForm";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home/*" element={<LandingPage />} />
        <Route path="/register/*" element={<RegisterPage />}>
          <Route path="step1" element={<PeopleForm />} />
          <Route path="step2" element={<PaperForm />} />
          <Route path="step3" element={<PaperForm />} />
        </Route>
        <Route path="/cafe/:locationId" element={<CafePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;

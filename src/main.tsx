// src/main.tsx
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom"; // 👉 ganti BrowserRouter jadi HashRouter
import App from "./App";
import Layout from "./layout";
import { ThemeProvider } from "./context/ThemeContext";
import ProfilePage from "./profilePage";
import "./index.css";
import UploadJsonPage from "./pages/UploadJsonFile";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/:id" element={<ProfilePage />} />
          <Route path="/upload-json" element={<UploadJsonPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </ThemeProvider>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UnitProvider } from "./context/UnitContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UnitProvider>
        <App />
      </UnitProvider>
    </BrowserRouter>
  </StrictMode>
);

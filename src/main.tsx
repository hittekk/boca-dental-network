import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { SiteDataProvider } from "./lib/site-data";
import { AnalyticsProvider } from "./lib/analytics";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SiteDataProvider>
      <AnalyticsProvider>
        <App />
      </AnalyticsProvider>
    </SiteDataProvider>
  </BrowserRouter>,
);

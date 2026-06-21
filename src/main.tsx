import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Component, type ReactNode } from "react";
import App from "./App.tsx";
import { SiteDataProvider } from "./lib/site-data";
import { AnalyticsProvider } from "./lib/analytics";
import { LangProvider } from "./lib/lang";
import "./index.css";

class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#ffffff",
            color: "#001D3D",
            fontFamily: "sans-serif",
            padding: "0 32px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#F3672A",
              marginBottom: 12,
            }}
          >
            Something went wrong
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 16px" }}>
            This page couldn't load.
          </h1>
          <p style={{ fontSize: 15, opacity: 0.6, marginBottom: 24 }}>
            Please try refreshing, or go back to the homepage.
          </p>
          <a
            href="/"
            style={{
              background: "#F3672A",
              color: "white",
              padding: "14px 24px",
              borderRadius: 8,
              fontWeight: 800,
              textDecoration: "none",
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Back to home →
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <BrowserRouter>
      <LangProvider>
        <SiteDataProvider>
          <AnalyticsProvider>
            <App />
          </AnalyticsProvider>
        </SiteDataProvider>
      </LangProvider>
    </BrowserRouter>
  </ErrorBoundary>
);

import { Provider } from "react-redux";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./features/store.ts";
import AuthListener from "./db/AuthListener.tsx";
import App from "./App.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthListener />
      <App />
    </Provider>
  </StrictMode>,
);

import { createRoot } from "react-dom/client";
import "@fontsource-variable/inter";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import App from "./App";
import { initNative } from "./native";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
initNative();

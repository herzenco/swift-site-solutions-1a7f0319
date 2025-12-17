import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Dispatch event for prerender plugin to know when rendering is complete
document.dispatchEvent(new Event("render-event"));

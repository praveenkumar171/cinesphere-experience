import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "leaflet/dist/leaflet.css";
import "./index.css";
import { registerServiceWorker } from "./lib/pwaUtils";

// TEMPORARILY DISABLED: Service worker was caching old code
// registerServiceWorker();

createRoot(document.getElementById("root")!).render(<App />);

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <main className="w-1/3 mx-auto">
            <App />
        </main>
    </React.StrictMode>
);

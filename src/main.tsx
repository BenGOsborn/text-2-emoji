import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <main className="w-5/6 lg:w-1/2 xl:w-1/3 mx-auto">
            <App />
        </main>
    </React.StrictMode>
);

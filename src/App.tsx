import { useState } from "react";

import "../styles/index.css";
import { submit } from "./submit";

function App() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiKey = import.meta.env.VITE_API_KEY;

    const [emoji, setEmoji] = useState<string[] | null>(null);

    return (
        <div className="App">
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    const value = (e.target as any).text.value;

                    const data = await submit(apiUrl, apiKey, value);
                    setEmoji(data);

                    // @ts-ignore
                    e.target.reset();
                }}
            >
                <label htmlFor="text">Text</label>
                <textarea name="text" id="text" placeholder="It seems like a windy day today..."></textarea>
                <input type="submit" value="Generate Emojis" />
            </form>
            {emoji && <p>Emoji list: {emoji.join(" ")}</p>}
        </div>
    );
}

export default App;

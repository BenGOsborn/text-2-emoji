import { useState } from "react";

import "../styles/index.css";
import { submit } from "./submit";

function App() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiKey = import.meta.env.VITE_API_KEY;

    const [emoji, setEmoji] = useState<string[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div className="mt-36 flex flex-col space-y-4">
            <h1 className="text-center text-2xl font-bold text-gray-900">💬 Text 2 Emoji 🤯</h1>
            <h2 className="text-center text-lg font-medium text-gray-800">Generate emojis that correspond to your message!</h2>
            <p className="text-center text-md font-medium text-gray-700">Simply enter your text below, press "Generate Emojis", and then copy your resulting emojis!</p>
            <form
                className="flex flex-col space-y-3"
                onSubmit={async (e) => {
                    e.preventDefault();

                    if (!loading) {
                        setLoading(true);

                        const value = (e.target as any).text.value;

                        submit(apiUrl, apiKey, value)
                            .then((data) => {
                                setEmoji(data);

                                // @ts-ignore
                                e.target.reset();

                                setLoading(false);
                            })
                            .catch(() => setLoading(false));
                    }
                }}
            >
                <label htmlFor="text" className="text-lg font-bold text-gray-800">
                    Your Message
                </label>
                <textarea rows={4} className="rounded-md border-none bg-gray-800 font-medium text-base text-white" name="text" id="text" placeholder="I am going to the movies today..."></textarea>
                {!loading ? (
                    <input className="bg-yellow-400 hover:bg-yellow-500 rounded-md p-3 font-bold text-lg text-gray-900 cursor-pointer" type="submit" value="Generate Emojis" />
                ) : (
                    <input className="bg-yellow-500 rounded-md p-3 font-bold text-lg text-gray-900 cursor-default" type="submit" disabled={true} value="Loading Emojis..." />
                )}
            </form>
            {emoji && (
                <>
                    <p className="text-lg font-bold text-gray-800">Best matching emojis:</p>
                    <p className="bg-gray-200 cursor-text rounded-md p-3 text-4xl">{emoji.join(" ")}</p>
                </>
            )}
        </div>
    );
}

export default App;

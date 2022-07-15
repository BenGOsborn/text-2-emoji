import axios from "axios";

export async function submit(apiUrl: string, apiKey: string, text: string) {
    const data = await axios.post<{ emoji: string[] }>(apiUrl, { input: text }, { headers: { "x-api-key": apiKey, "Access-Control-Allow-Origin": "*" } });
    console.log(data);
}

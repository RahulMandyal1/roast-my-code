"use client"; // This is a client component 👈🏽

import { useState, useEffect } from "react";

import { queryGemini } from "../utils/gemini";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleQuery = () => {
    queryGemini(prompt);
  };

  return (
    <main>
      <h1>Roast my code</h1>
      <h2>get a free design audit powered by AI</h2>
      <textarea
        className="
            border rounded p-2 w-full
            focus:ring focus:ring-blue-500 focus:ring-opacity-50
            h-24 resize-none text-black"
        placeholder="Enter your text here..."
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
      ></textarea>
      <button onClick={handleQuery}>Roast it!</button>
    </main>
  );
}

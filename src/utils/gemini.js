import { GoogleGenerativeAI } from "@google/generative-ai";

export async function queryGemini(prompt) {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyCKUK3_kyRc1MLeUbMBhE6tv5XxpiHggUs"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent([prompt]);
  console.log(result.response.text());
}

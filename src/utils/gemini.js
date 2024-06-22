import { GoogleGenerativeAI } from "@google/generative-ai";

export async function queryGemini(code) {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyCKUK3_kyRc1MLeUbMBhE6tv5XxpiHggUs"
  );

  const prompt = `
Roast this code mercilessly in 2-3 sentences. Be savage, use dark humor, and don't hold back. 
Then, grudgingly provide 2-3 key suggestions for improvement. Keep it brief and brutal.

Code:
${code}
`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent([prompt]);
  return result.response.text();
}

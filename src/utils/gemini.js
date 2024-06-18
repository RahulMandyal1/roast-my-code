import { GoogleGenerativeAI } from "@google/generative-ai";

export async function queryGemini(code) {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyCKUK3_kyRc1MLeUbMBhE6tv5XxpiHggUs"
  );

  const prompt = `
  I have some code I'd like you to review. First, I want you to roast it with a savage reply,
   highlighting all the flaws and mistakes in a humorous and brutally honest manner. 
   Then, please follow up with constructive suggestions on how to improve the code. Here's the code:

   ${code}
  `;
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent([prompt]);

  console.log(result.response.text());
  return result.response.text;
}

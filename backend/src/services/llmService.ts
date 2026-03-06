// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
  temperature: 0,
});

// export const analyzeFeedback = async (message: string) => {
//   try {
//     const response = await llm.invoke([
//       new SystemMessage(`
// You are an AI assistant for a feedback management system.

// Extract the following fields from the user's feedback:
// - category (Technical, Billing, General, Feature Request, Complaint)
// - priority (Low, Medium, High)
// - sentiment (Positive, Neutral, Negative)
// - team (Engineering, Support, Sales)

// Return ONLY valid JSON format like:
// {
//   "category": "",
//   "priority": "",
//   "sentiment": "",
//   "team": ""
// }
//       `),
//       new HumanMessage(message),
//     ]);
//     console.log("LLM Response:", response);

//     return JSON.parse(response.content as string);
//   } catch (error) {
//     console.error("LLM Error:", error);
//     return null;
//   }
// };






export const analyzeFeedback = async (message: string) => {
  try {
    const response = await llm.invoke([
      new SystemMessage(`
You are an AI assistant for a feedback management system.

Extract the following fields:
- category (Technical, Billing, General, Feature Request, Complaint)
- priority (Low, Medium, High)
- sentiment (Positive, Neutral, Negative)
- team (Engineering, Support, Sales)

Return ONLY valid JSON:
{
  "category": "",
  "priority": "",
  "sentiment": "",
  "team": ""
}
      `),
      new HumanMessage(message),
    ]);

    let content = response.content as string;

    // Remove markdown formatting if exists
    content = content.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(content);
  } catch (error) {
    console.error("LLM Error:", error);
    return null;
  }
};
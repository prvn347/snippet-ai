// const { GoogleGenerativeAI } = require("@google/generative-ai");
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");

export async function POST(req: NextRequest) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = await req.json();
  const result = await model.generateContent(prompt.messages);
  const response = await result.response;
  const text = response.text();

  return NextResponse.json({ mag: text });
}

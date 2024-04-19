import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const ress = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;

  const url = "https://api.anthropic.com/v1/messages";

  const body = JSON.stringify({
    messages: ress.messages,
    model: "claude-3-opus-20240229",
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body,
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(error);
  }
}

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const bearer = `Bearer ${process.env.OPENAI_API_KEY}`;

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams;
  const threadId = url.get("threadId");
  const run_id = url.get("run_id");

  try {
    const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${run_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
        "OpenAI-Beta": "assistants=v2",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching chat" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const url = request.nextUrl.searchParams;
  const threadId = url.get("threadId");

  try {
    const body = await request.json();

    const response = await axios.post(`https://api.openai.com/v1/threads/${threadId}/runs`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
        "OpenAI-Beta": "assistants=v2",
      },
    });

    const processedData = response.data;
    return NextResponse.json({ message: "Data processed", data: processedData });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { baseUrl } from "@/lib/baseURL";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const bearer = `Bearer ${process.env.OPENAI_API_KEY}`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await axios.post(`${baseUrl}/api/chat/trace`, body, {
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

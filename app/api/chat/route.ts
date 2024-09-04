import { NextRequest, NextResponse } from "next/server";
import getSpecificBlogPostByTitle from "@/lib/sanityLib/sanityRequests";
import axios from "axios";

export async function GET(request: NextRequest) {
  const key = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  console.log("key", key);
  const threadId = "thread_xd1l2jNnkAPHcVhGjKWRJ1Qr";
  try {
    const post = await fetch("https://jsonplaceholder.typicode.com/posts/1");

    const response = await axios.get(
      `https://api.openai.com/v1/threads/${threadId}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: key,
          "OpenAI-Beta": "assistants=v2",
        },
      }
    );

    // console.log("get thread data", response.data);

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching chat" }, { status: 500 });
  }
}

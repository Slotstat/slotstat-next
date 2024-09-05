import { NextRequest, NextResponse } from "next/server";
// import getSpecificBlogPostByTitle from "@/lib/sanityLib/sanityRequests";
import axios from "axios";

export async function GET(request: NextRequest) {
  const key =
    "Bearer sk-k4uT6i_50f1G6is_rOg--sqF6FW7Jzpns_sopgAYuST3BlbkFJe3HX2ZlXIuOYdI3vAqG3B_NobuA24EnuaweT_wHhUA";
  console.log("key", key);
  const threadId = "thread_xd1l2jNnkAPHcVhGjKWRJ1Qr";
  try {
    // const post = await fetch("https://jsonplaceholder.typicode.com/posts/1");

    // const response = await fetch(
    //   `https://api.openai.com/v1/threads/${threadId}`,

    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: key,
    //       "OpenAI-Beta": "assistants=v2",
    //     },
    //   }
    // );

    // console.log("get thread data", response);

    return NextResponse.json('response');
  } catch (error) {
    return NextResponse.json({ error: "Error fetching chat" }, { status: 500 });
  }
}

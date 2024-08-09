import { NextRequest, NextResponse } from "next/server";
import getSpecificBlogPostByTitle from "@/lib/sanityLib/sanityRequests";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const title = searchParams.get("title");

  if (!category || !title) {
    return NextResponse.json(
      { error: "Missing category or title" },
      { status: 400 }
    );
  }

  try {
    const post = await getSpecificBlogPostByTitle(category, title);
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching blog post" },
      { status: 500 }
    );
  }
}

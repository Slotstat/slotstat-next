import { baseUrl } from "@/lib/baseURL";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, userName, token } = await req.json();

    // Call your backend API to verify the email
    const response = await fetch(`${baseUrl}/api/user/email/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, userName, token }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || "Verification failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Email verified successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}

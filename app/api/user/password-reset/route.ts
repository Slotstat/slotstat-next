import { baseUrl } from "@/lib/baseURL";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, token } = await req.json();

    const response = await fetch(`${baseUrl}/api/user/password/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, token }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || "Password reset failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}

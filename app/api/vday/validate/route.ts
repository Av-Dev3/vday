import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/vday/config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { answer } = body;

    const correctAnswer = process.env.VDAY_FINAL_ANSWER || "forever";

    if (answer?.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) {
      // Generate a simple auth token
      const token = Math.random().toString(36).substring(2) + Date.now().toString(36);

      const response = NextResponse.json({ ok: true });
      
      // Set httpOnly cookie
      response.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return response;
    }

    return NextResponse.json({ ok: false }, { status: 400 });
  } catch (error) {
    console.error("Validation error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

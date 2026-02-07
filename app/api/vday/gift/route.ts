import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/vday/config";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Token exists, return the gift
  const gift = {
    title: process.env.VDAY_GIFT_TITLE || "Your Valentine's Day Gift",
    message:
      process.env.VDAY_GIFT_MESSAGE ||
      "A special surprise awaits you, my love.",
    address: process.env.VDAY_GIFT_ADDRESS || "",
    mapUrl: process.env.VDAY_GIFT_MAP_URL || "",
  };

  return NextResponse.json(gift);
}

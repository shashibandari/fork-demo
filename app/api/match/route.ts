import { NextRequest, NextResponse } from "next/server";
import { findVanityMatches, validatePhoneNumber } from "@/lib/keypad";

const MAX_BODY_LENGTH = 100;

export async function POST(request: NextRequest) {
  try {
    const text = await request.text();

    if (text.length > MAX_BODY_LENGTH) {
      return NextResponse.json(
        { error: "Enter a valid 10-digit phone number." },
        { status: 400 }
      );
    }

    const body = JSON.parse(text) as { phoneNumber?: string };

    if (!body.phoneNumber || typeof body.phoneNumber !== "string") {
      return NextResponse.json(
        { error: "Enter a valid 10-digit phone number." },
        { status: 400 }
      );
    }

    const validation = validatePhoneNumber(body.phoneNumber);

    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const result = findVanityMatches(validation.normalized);

    return NextResponse.json({
      phoneNumber: validation.normalized,
      matches: result.matches,
      weakMatches: result.weakMatches,
      hasStrongMatch: result.hasStrongMatch,
    });
  } catch {
    return NextResponse.json(
      { error: "Enter a valid 10-digit phone number." },
      { status: 400 }
    );
  }
}

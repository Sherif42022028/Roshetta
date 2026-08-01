import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const serviceUrl = process.env.CLINICAL_NOTES_SERVICE_URL || "http://localhost:8000";

    // Proxy request to external Python Whisper + Claude FastAPI service
    return NextResponse.json({
      status: "proxy_ready",
      target_service: serviceUrl,
      payload: body,
      message: "Clinical notes service endpoint configured"
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to communicate with clinical notes service" },
      { status: 500 }
    );
  }
}

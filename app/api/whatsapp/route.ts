import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const serviceUrl = process.env.WHATSAPP_SERVICE_URL || "http://localhost:3001";

    return NextResponse.json({
      status: "proxy_ready",
      target_service: serviceUrl,
      payload: body,
      message: "WhatsApp service proxy endpoint active"
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to proxy to WhatsApp service" },
      { status: 500 }
    );
  }
}

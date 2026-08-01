import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "success",
    data: [],
    message: "Appointments API endpoint active"
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    status: "created",
    data: body
  });
}

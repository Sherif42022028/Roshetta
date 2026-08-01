import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { isFirstVisit, previousNoShowsCount } = await request.json();

  // Heuristic evaluation placeholder logic
  let riskLevel = "LOW";
  if (isFirstVisit && previousNoShowsCount > 0) {
    riskLevel = "HIGH";
  } else if (isFirstVisit || previousNoShowsCount > 0) {
    riskLevel = "MEDIUM";
  }

  return NextResponse.json({
    noshow_risk: riskLevel,
    is_heuristic: true,
  });
}

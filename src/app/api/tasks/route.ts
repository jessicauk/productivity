import { NextResponse } from "next/server";

export function GET(): NextResponse {
  return NextResponse.json("GET TASKS");
}
export function POST(): NextResponse {
  return NextResponse.json("POST TASKS");
}

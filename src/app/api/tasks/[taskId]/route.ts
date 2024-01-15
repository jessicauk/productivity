import { NextResponse } from "next/server";

export function GET(
  request: any,
  { params }: { params: { taskId: string } }
): NextResponse {
  return NextResponse.json("GET" + params.taskId);
}
export function PUT(
  request: any,
  { params }: { params: { taskId: string } }
): NextResponse {
  return NextResponse.json("PUT" + params.taskId);
}
export function DELETE(
  request: any,
  { params }: { params: { taskId: string } }
): NextResponse {
  return NextResponse.json("DELETE" + params.taskId);
}

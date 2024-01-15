import { NextResponse } from "next/server";

export function GET({ params }: { params: { taskId: string } }): NextResponse {
  return NextResponse.json("GET" + params.taskId);
}
export function PUT({ params }: { params: { taskId: string } }): NextResponse {
  return NextResponse.json("PUT" + params.taskId);
}
export function DELETE({ params }: { params: { taskId: string } }): NextResponse {
  return NextResponse.json("DELETE" + params.taskId);
}

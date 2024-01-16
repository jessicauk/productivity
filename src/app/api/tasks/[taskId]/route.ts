import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: any,
  { params }: { params: { taskId: string } }
): Promise<NextResponse> {
  const task = await prisma.task.findUnique({
    where: { taskId: Number(params.taskId) },
  });
  return NextResponse.json({ data: task });
}
export async function PUT(
  request: any,
  { params }: { params: { taskId: string } }
): Promise<NextResponse> {
  const data = await request.json();
  const taskUpdated = await prisma.task.update({
    where: { taskId: Number(params.taskId) },
    data,
  });
  return NextResponse.json({ data: taskUpdated });
}
export async function DELETE(
  request: any,
  { params }: { params: { taskId: string } }
): Promise<NextResponse> {
  try {
    const task = await prisma.task.delete({
      where: { taskId: Number(params.taskId) },
    });
    return NextResponse.json({ taskId: params.taskId, data: task });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

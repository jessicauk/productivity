import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

export async function POST(request: any) {
  const { title, description, status, done, authorId } = await request.json();
  const newTask = await prisma.task.create({
    data: { title, description, status, done, authorId },
  });

  return NextResponse.json({
    data: newTask,
    message: "Task created",
    status: "success",
    statusCode: 200,
  });
}

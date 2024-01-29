import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tasks = await prisma.task.findMany({
    include: {
      status: {
        select: {
          name: true,
          statusId: true,
        }
      },
      priority: {
        select: {
          name: true,
          priorityId: true,
        }
      },
    },
    orderBy: {
      priorityId: "desc",
    },
  });
  return NextResponse.json(tasks);
}

export async function POST(request: any) {
  const { title, description, priorityId, duration } = await request.json();
  const newTask = await prisma.task.create({
    data: { title, description, priorityId, duration },
  });

  return NextResponse.json({
    data: newTask,
    message: "Task created",
    status: "success",
    statusCode: 200,
  });
}

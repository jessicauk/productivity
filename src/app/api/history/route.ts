import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        status: {
          select: {
            name: true,
            statusId: true,
          },
        },
        priority: {
          select: {
            name: true,
            priorityId: true,
          },
        },
      },
      where: {
        done: true,
      },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.error();
  }
}

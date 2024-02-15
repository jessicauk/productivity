import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  try {
    const tasks = await prisma.task.groupBy({
      by: ["statusId"],
      where: {
        status: {
          name: {
            in: ["In Progress", "Completed"],
          },
        },
      },
      _sum: {
        timeSpent: true,
      },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.error();
  }
}

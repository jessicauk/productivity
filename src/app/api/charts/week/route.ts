import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const today = new Date();
  const lastWeekStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 2,
  );
  try {
    const tasks = await prisma.task.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: lastWeekStart,
          lt: today,
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

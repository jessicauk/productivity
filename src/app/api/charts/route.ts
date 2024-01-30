import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  try {
    const tasks = await prisma.task.findMany({
      where: {
        updatedAt: {
          gte: oneWeekAgo, // 'gte' stands for 'greater than or equal to'
        },
      },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.error();
  }
}
